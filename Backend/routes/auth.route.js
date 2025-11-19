import { Router } from "express";
import {createProfile, updatePassword, login, getMyProfile, deleteProfile} from "../controllers/Profile.controller.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
const auth = Router();


auth.post("/profile/create", createProfile);
auth.post("/profile/update",updatePassword);

auth.post("/login",login);

auth.get("/profile/get",authenticateJWT, getMyProfile);

auth.delete("/profile/:id", deleteProfile);

export default auth;
