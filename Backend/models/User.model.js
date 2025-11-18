import {Schema, model} from "mongoose";


const User = new Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required: true,
    },
    password: {
      type:String,
        required:true
    },
    role : {
        type: ["admin", "teacher", "maintainer"],
        required:true
    }
}, {timestamps: true});

export default model("User", User);