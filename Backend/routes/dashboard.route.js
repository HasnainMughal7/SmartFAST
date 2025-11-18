import {Router} from "express";
import {  getProfiles, getProfile, getQueries } from "../controllers/Dashboard.controller.js";
import { addRooms, getRooms } from "../controllers/Rooms.controller.js";


const dashboard = Router();

dashboard.get("/profiles", getProfiles);
dashboard.get("/profiles/:id", getProfile);
dashboard.get("/queries",getQueries);
dashboard.get("/rooms", getRooms);


dashboard.post("/rooms/add", addRooms);

export default dashboard;