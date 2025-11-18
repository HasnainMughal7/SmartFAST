import {Schema, model} from "mongoose";


const Room = new Schema({
    Block: {
        type: ["Academic Block 1", "Academic Block 2", "Multipurpose Block"]
    },
    number :{
        type:String,
        required : true 
    },
    floor: {
        type: ["Ground", "1st", "2nd", "3rd", "4th", "5th"],
        required: true,
    }
}, {timestamps: true});

export default model("Room", Room);