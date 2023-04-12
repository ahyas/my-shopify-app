import mongoose from "mongoose";

export default async function connectDB(uri){
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(uri)
        console.log("App is connected to DB")
    } catch (error) {
        console.log(error)
    }
}