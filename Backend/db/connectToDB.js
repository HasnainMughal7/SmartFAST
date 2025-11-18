import mongoose from "mongoose";

export default async function connectToDB() {
    // Hello Hasnain!
    return mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Connected to DB!")).catch(e=> console.log(e));
}