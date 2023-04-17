import mongoose from "mongoose"
const Schema = mongoose.Schema
const data = mongoose.model("expenses", Schema({
    id_category:mongoose.Types.ObjectId,
    information:String,
    value:Number,
    date_created:Date,
    date_updated:Date
}))

const ExpenseShow = async (req, res) => {
    try {
        const result = await data.find({})
        res.json({data:result, total:22000})
    } catch (error) {
        res.json({msg:error})
    }   
}

export {ExpenseShow}