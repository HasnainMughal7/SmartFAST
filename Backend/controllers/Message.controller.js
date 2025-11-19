import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import {InternalServerError} from "../Errors/error.js";

export async function addMessage(Request,Response) {
    const {content, userID} = Request.body;
    
    console.log(userID);
    try {
        const user = await User.findById(userID);
        const message = await Message.create({
            content,
            userID: user.id,
            username: user.username,
            role: user.role
        });

        return Response.status(200).json(message);

    } catch (error) {
        console.error("Error in addMessage:", error);
        InternalServerError(Response);
    }

}

export async function getMessages (Request,Response) {
    try {

        const messages = await Message.find();

        if(messages.length >0) {
            Response.status(200).json({messages});

        }
        else {
            Response.status(4040).json({message: "No messages found!"});
        }
    } catch (error) {
        InternalServerError(Response, error);
    }
}