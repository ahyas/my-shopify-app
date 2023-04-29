import mongoose from "mongoose";
const Schema = mongoose.Schema
const data = mongoose.model("categories", Schema({
    information:String
}))

const expense = mongoose.model("expenses")

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

const CategoryView = async (req, res) => {
    try {
        let result = await data.find({_id:req.params.id})
        res.json({data:result})
    } catch (error) {
        res.json(error)
    }
}

const DeleteCategory = async (req, res) => {
    try {
        let find = await expense.find({id_category:req.params.id}).count()
        if(find===0){
            await data.findByIdAndDelete({_id:req.params.id})
        }
        res.json({count:find})
    } catch (error) {
        res.json({msg:error})
    }
}

const UpdateCategory = async(req, res)=>{
    try {
        await data.findByIdAndUpdate(req.params.id, {information:req.body.information})
        res.json({msg:"Success"})
    } catch (error) {
        res.json(error)
    }
}

export {CategoryShow, CategorySave, CategoryView, DeleteCategory, UpdateCategory}