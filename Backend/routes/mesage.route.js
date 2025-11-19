import {Router} from "express";
import {addMessage, getMessages} from "../controllers/Message.controller.js"
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const message = Router();

export default message;

message.post("/",authenticateJWT, addMessage);
// message.post("/",authenticateJWT, addMessage);
// message.get("/all",authenticateJWT,getMessages);
message.get("/all",authenticateJWT, getMessages);