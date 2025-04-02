"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
// Validation schemas
const signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
});
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
// Sign up route
router.post("/signup", async (req, res) => {
    try {
        console.log("Received signup request:", req.body);
        // Basic validation
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(400).json({ message: "Please provide email, password, and name" });
        }
        // Check if user exists
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = new User_1.User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });
        // Save user
        await user.save();
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        // Return user data (excluding password)
        const userData = user.toObject();
        const { password: _ } = userData, userWithoutPassword = __rest(userData, ["password"]);
        res.status(201).json({
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
// Sign in route
router.post("/signin", async (req, res) => {
    try {
        console.log("Received signin request:", req.body);
        // Validate request body
        const validatedData = signInSchema.parse(req.body);
        console.log("Validated signin data:", validatedData);
        // Find user
        console.log("Looking up user...");
        const user = await User_1.User.findOne({ email: validatedData.email });
        if (!user) {
            console.log("User not found:", validatedData.email);
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log("User found:", user._id);
        // Check password
        console.log("Verifying password...");
        const isValidPassword = await user.comparePassword(validatedData.password);
        if (!isValidPassword) {
            console.log("Invalid password for user:", user._id);
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log("Password verified successfully");
        // Generate token
        console.log("Generating JWT token...");
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        console.log("Token generated successfully");
        // Return user data (excluding password)
        const userData = user.toObject();
        const { password: _ } = userData, userWithoutPassword = __rest(userData, ["password"]);
        console.log("Sending success response");
        res.json({
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Signin error details:", {
            name: error instanceof Error ? error.name : "Unknown",
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });
        if (error instanceof zod_1.z.ZodError) {
            console.error("Validation error:", error.errors);
            res.status(400).json({
                message: "Validation error",
                errors: error.errors.map(e => ({
                    field: e.path.join("."),
                    message: e.message
                }))
            });
        }
        else if (error instanceof mongoose_1.default.Error) {
            console.error("Mongoose error:", error);
            res.status(500).json({
                message: "Database error",
                error: error.message
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
});
// Verify token route
router.get("/verify", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
});
// Sign out route
router.post("/signout", async (req, res) => {
    // In a JWT-based system, the client just needs to remove the token
    // The server doesn't need to do anything
    res.json({ message: "Signed out successfully" });
});
exports.default = router;
