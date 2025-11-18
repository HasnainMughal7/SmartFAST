import {Schema, model} from "mongoose";


const Query = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
      type:["Urgent", "Moderate"],
        default: "Moderate"
    },
    status : {
        type : ["Pending", "In Progress", "Completed"],
        default : "Pending",
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    comment : {
        type :String,
        required: false,
    }
}, {timestamps: true});

export default model("Query", Query);