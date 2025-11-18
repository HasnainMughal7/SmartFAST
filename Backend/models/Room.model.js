import {Schema, model} from "mongoose";


const Room = new Schema({
    block: {
        type: String,
        enum:["Academic Block 1", "Academic Block 2", "Multipurpose Block"],
        required:true
    },
    number :{
        type:String,
        required : true 
    },
    floor: {
        type: String,
        enum:["Ground", "1st", "2nd", "3rd", "4th", "5th"],
        required: true,
    }
}, {timestamps: true});

export default model("Room", Room);