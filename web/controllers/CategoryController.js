import mongoose from "mongoose";
const Schema = mongoose.Schema
const data = mongoose.model("categories", Schema({
    information:String
}))

const CategoryShow = async (req, res) => {
    try {
        const result = await data.find({})
        res.json({msg:"Success", data:result})
    } catch (error) {
        res.json({msg:"Success"})
    }
}

export {CategoryShow}