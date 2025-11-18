import Query from "../models/Query.model.js";

export const addQuery = async(Request,Response,Next)=>{
        const {userID, block,floor,number} = Request.body;
    try {
        const query = await Query.create({userID,block,number,floor });
        Response.status(201).json(query);
        
    } catch (error) {
        InternalServerError(Response, error)
    }
}

