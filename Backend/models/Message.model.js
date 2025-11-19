import {Schema,model} from "mongoose";


const Message = new Schema({
    userID : {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    username: {
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["admin", "maintainer", "teacher"],
        required:true
    },
    content : {
        type: String,
        min: 1,
        required:true
    }
}, {timestamps: true});

export default model("Message", Message);