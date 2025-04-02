import express, { Request, Response } from "express"
import jwt, { Secret, SignOptions } from "jsonwebtoken"
import { z } from "zod"
import { User, IUser } from "../models/User"
import mongoose from "mongoose"

const router = express.Router()

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Sign up route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log("Received signup request:", req.body)
    
    // Basic validation
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({ message: "Please provide email, password, and name" })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    })

    // Save user
    await user.save()

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXPIRES_IN } as SignOptions
    )

    // Return user data (excluding password)
    const userData = user.toObject()
    const { password: _, ...userWithoutPassword } = userData

    res.status(201).json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ 
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
})

// Sign in route
router.post("/signin", async (req: Request, res: Response) => {
  try {
    console.log("Received signin request:", req.body)
    
    // Validate request body
    const validatedData = signInSchema.parse(req.body)
    console.log("Validated signin data:", validatedData)

    // Find user
    console.log("Looking up user...")
    const user = await User.findOne({ email: validatedData.email })
    if (!user) {
      console.log("User not found:", validatedData.email)
      return res.status(401).json({ message: "Invalid email or password" })
    }
    console.log("User found:", user._id)

    // Check password
    console.log("Verifying password...")
    const isValidPassword = await user.comparePassword(validatedData.password)
    if (!isValidPassword) {
      console.log("Invalid password for user:", user._id)
      return res.status(401).json({ message: "Invalid email or password" })
    }
    console.log("Password verified successfully")

    // Generate token
    console.log("Generating JWT token...")
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXPIRES_IN } as SignOptions
    )
    console.log("Token generated successfully")

    // Return user data (excluding password)
    const userData = user.toObject()
    const { password: _, ...userWithoutPassword } = userData

    console.log("Sending success response")
    res.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signin error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    })

    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => ({
          field: e.path.join("."),
          message: e.message
        }))
      })
    } else if (error instanceof mongoose.Error) {
      console.error("Mongoose error:", error)
      res.status(500).json({ 
        message: "Database error", 
        error: error.message 
      })
    } else {
      res.status(500).json({ 
        message: "Internal server error", 
        error: error instanceof Error ? error.message : "Unknown error" 
      })
    }
  }
})

// Verify token route
router.get("/verify", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as { userId: string }

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Token verification error:", error)
    res.status(401).json({ message: "Invalid token" })
  }
})

// Sign out route
router.post("/signout", async (req, res) => {
  // In a JWT-based system, the client just needs to remove the token
  // The server doesn't need to do anything
  res.json({ message: "Signed out successfully" })
})

export default router 