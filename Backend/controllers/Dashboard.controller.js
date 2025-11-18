import User from "../models/User.model.js";
import Query from "../models/Query.model.js";
import {InternalServerError} from "../Errors/error.js";
export const getProfiles = async(Request,Response,Next)=>{
    console.log("GET /api/profiles")
    try {
        const users = await User.find({},{username:1, email:1, role:1, queries:1});
        Response.status(200).json({users});
    } catch (error) {
        InternalServerError(Response);
    }
}

export const getProfile = async(Request,Response,Next)=>{
    const {id} = Request.params;

    try {
        const user = await User.findById(id, {email:1, username:1, queries:1, _id:1});
        if(user) {
            Response.status(200).json(user);
        }
    } catch (error) {
        
    }
}

export const getQueries = async(Request,Response,Next)=>{
    try {
        const queries = await Query.find();

        if(queries.length > 0) {
           return Response.status(200).json(queries);
        }
        else {
            return Response.status(404).json({message: "No queries found!"})
        }
    } catch (error) {
        InternalServerError(Response, error)
    }
}

