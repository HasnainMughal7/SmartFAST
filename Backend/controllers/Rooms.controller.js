import { InternalServerError } from "../Errors/error.js";
import Room from "../models/Room.model.js"

export const getRooms = async(Request,Response,Next)=>{
    try {
        const rooms = await Room.find();

        Response.status(200).json(rooms);
    } catch (error) {
        InternalServerError(Response);
    }
}

export const addRooms = async(Request,Response,Next)=>{
    const {block,number,floor} = Request.body;

    try {
        const room = await Room.create({block,number,floor});
        return Response.status(200).json({floor,number,block,roomID: room._id});
    } catch (error) {
        InternalServerError(Response);
    }
}