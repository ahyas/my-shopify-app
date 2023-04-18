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

const CategorySave = async (req, res) => {
    try {
        await data.create(req.body)
        console.log(req.body)
        res.json({msg:"Success"})
    } catch (error) {
        res.json({msg:error})
    }
}

export {CategoryShow, CategorySave}