import { Router } from "express";
import {createProfile, updatePassword, login} from "../controllers/Profile.controller.js";

const auth = Router();


auth.post("/profile/create", createProfile);
auth.post("/profile/update",updatePassword);

auth.post("/login",login);

export default auth;
