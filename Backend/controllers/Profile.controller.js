import User from "../models/User.model.js";
import { setAuthCookie,clearAuthCookie } from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken"; 
import bcrypt from 'bcryptjs';
import { InternalServerError } from "../Errors/error.js";


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

export const createProfile = async (Request, Response, Next) => {
    console.log("POST /api/auth/profile/create");
    const { username, password, email, role } = Request.body;
    
    // 1. Input Validation
    if (!validate(username, password)) {
        return Response.status(400).json({ message: "Invalid input: Username cannot contain spaces and password must be at least 8 characters." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return Response.status(409).json({ message: "Username already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            password: hashedPassword, // Store the HASHED password
            role,
            email
        });
        const payload = { userId: user._id, role: user.role };
        setAuthCookie(Response, payload);
        Response.status(201).json({ 
            message: "Profile created successfully and logged in.",
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (error) {
        console.error("Error creating profile:", error);
        Response.status(500).json({ message: "Internal Server Error during profile creation." });
    }
}


export const updatePassword = async (Request, Response) => {
    const { username,password } = Request.body;
    if (!newPassword || password.length < 8) {
        return Response.status(400).json({ message: "New password must be at least 8 characters long." });
    }
    try {
        const user = await User.findOne({username});
        if(user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const result = await User.findByIdAndUpdate(user.id, 
                { password: hashedPassword }, 
                { new: true, runValidators: true }
            );
            if (!result) {
                return Response.status(404).json({ message: "User not found." });
            }
            return Response.status(200).json({ message: "Password updated successfully." });
        }
        return Response.status(404).json({message: "User not found!"});

    } catch (error) {
        console.error("Error updating password:", error);
        InternalServerError(Response);
    }
}

export async function deleteProfile(Request, Response) {
    const {id} = Request.params;
    // console.log("id: ", id);
    try {
        await User.findByIdAndDelete(id);
        Response.status(200).json({message: "User deleted successfully!"});
        
    } catch (error) {
        // console.log("Error!!!")
        InternalServerError(Response, error);
    }
}
export const login = async(Request,Response)=>{
    console.log("POST /api/auth/login");
    const {username,password} = Request.body; // Username + Password
    console.log("Login attempt for username:", username, "with password:", password);
    if(username || password) {

        try {
            const user = await User.findOne({username});
            if(user) {
                const isvalid = await bcrypt.compare(password, user.password);
                if(isvalid) {
                setAuthCookie(Response,{userID:user._id});
                return Response.status(200).json({username, userID: user._id});
            }
            else {
                return Response.status(401).json({message: "Invalid Credentials!"})
            }
        }
        return Response.status(401).json({message: "Invalid Credentials!"})
     } catch (error) {
        console.log("Error yahan hai!");
        console.log(error);
        Response.status(500).json({message: "Internal Server Error!"})
    }
    }
}

export async function getMyProfile(Request,Response) {
    const {userID} = Request.body;

    try {
        const user = await User.findById(userID,{username:1, email:1, role:1, queries:1});
        if(user) {
            Response.status(200).json(user);
        }
        else {
            clearAuthCookie(Response);
            Response.status(401).json({message: "Unauthorized Profile!"});
        }
    } catch (error) {
        InternalServerError(Response,error);
    }
}