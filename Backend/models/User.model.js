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
        type: String,
        enum:["admin", "teacher", "maintainer"],
        required:true
    },
    queries: {
        type: [Schema.Types.ObjectId],
        ref: "Query",
        required: false,
        default: []
    }
}, {timestamps: true});

export default model("User", User);