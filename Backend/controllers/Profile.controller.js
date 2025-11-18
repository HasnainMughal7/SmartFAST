import User from "../models/User.model.js";
import { setAuthCookie } from "../middlewares/authMiddleware.js"; 
import bcrypt from 'bcryptjs';

const validate = (username, password) => {
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return false;
    }

    else if (username.includes(" ")) {
        return false;
    }    
    else if (password.length < 8) {
        return false;
    }

    return true;
}

export const createProfile = async (req, res, next) => {
    console.log("POST /api/auth/profile/create");
    const { username, password, email, role } = req.body;
    
    // 1. Input Validation
    if (!validate(username, password)) {
        return res.status(400).json({ message: "Invalid input: Username cannot contain spaces and password must be at least 8 characters." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            username,
            password: hashedPassword, // Store the HASHED password
            role: role || "",
            email
        });
        const payload = { userId: user._id, role: user.role };
        setAuthCookie(res, payload);
        res.status(201).json({ 
            message: "Profile created successfully and logged in.",
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Internal Server Error during profile creation." });
    }
}


export const updatePassword = async (req, res, next) => {
    // Assumes req.user is set by authenticateJWT middleware
    const userId = req.user?.userId; 
    const { newPassword } = req.body; // Use 'newPassword' to avoid confusion

    if (!userId) {
        // This should not happen if authenticateJWT runs first, but is a safety check
        return res.status(401).json({ message: "Authentication required." });
    }
    
    // Perform password validation here too (e.g., minimum length)
    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "New password must be at least 8 characters long." });
    }

    try {
        // 1. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // 2. Find and update the user in the database
        const result = await User.findByIdAndUpdate(userId, 
            { password: hashedPassword }, 
            { new: true, runValidators: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        // 3. Inform the user
        res.status(200).json({ message: "Password updated successfully." });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal Server Error during password update." });
    }
}