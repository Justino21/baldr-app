"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables
dotenv_1.default.config();
// Check if MongoDB URI is set
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set in environment variables");
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});
// Routes
app.use("/api/auth", auth_1.default);
// MongoDB connection
let isConnecting = false;
const MAX_RETRIES = 3;
let retryCount = 0;
const connectDB = async () => {
    if (isConnecting)
        return;
    try {
        isConnecting = true;
        console.log(`Attempting to connect to MongoDB (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected successfully to ${conn.connection.name} database`);
        // Reset retry count on successful connection
        retryCount = 0;
        isConnecting = false;
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        isConnecting = false;
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying connection in 5 seconds... (${retryCount}/${MAX_RETRIES})`);
            setTimeout(connectDB, 5000);
        }
        else {
            console.error(`Failed to connect after ${MAX_RETRIES} attempts. Exiting...`);
            process.exit(1);
        }
    }
};
// Handle MongoDB connection errors
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    if (retryCount < MAX_RETRIES) {
        console.log("MongoDB disconnected. Attempting to reconnect...");
        connectDB();
    }
});
// Initial connection
connectDB();
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
