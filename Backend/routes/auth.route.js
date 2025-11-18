import { Router } from "express";
import {createProfile, updatePassword} from "../controllers/Profile.controller.js";

const auth = Router();


auth.post("/profile/create", createProfile);
auth.post("/profile/update",updatePassword)

export default auth;
