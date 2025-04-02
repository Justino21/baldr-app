import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"

// Load environment variables
dotenv.config()

// Check if MongoDB URI is set
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment variables")
  process.exit(1)
}

const app = express()
const port = process.env.PORT || 3001

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err)
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  })
})

// Routes
app.use("/api/auth", authRoutes)

// MongoDB connection
let isConnecting = false
const MAX_RETRIES = 3
let retryCount = 0

const connectDB = async () => {
  if (isConnecting) return
  
  try {
    isConnecting = true
    console.log(`Attempting to connect to MongoDB (attempt ${retryCount + 1}/${MAX_RETRIES})...`)
    
    const conn = await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`MongoDB Connected successfully to ${conn.connection.name} database`)
    
    // Reset retry count on successful connection
    retryCount = 0
    isConnecting = false
  } catch (error) {
    console.error("MongoDB connection error:", error)
    isConnecting = false
    
    if (retryCount < MAX_RETRIES) {
      retryCount++
      console.log(`Retrying connection in 5 seconds... (${retryCount}/${MAX_RETRIES})`)
      setTimeout(connectDB, 5000)
    } else {
      console.error(`Failed to connect after ${MAX_RETRIES} attempts. Exiting...`)
      process.exit(1)
    }
  }
}

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  if (retryCount < MAX_RETRIES) {
    console.log("MongoDB disconnected. Attempting to reconnect...")
    connectDB()
  }
})

// Initial connection
connectDB()

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 