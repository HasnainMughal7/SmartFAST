import {Router} from "express";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import { addQuery } from "../controllers/Query.controller.js";

const query = Router();


query.post("add",authenticateJWT,addQuery);


export default query;