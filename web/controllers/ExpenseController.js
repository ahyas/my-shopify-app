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
        const total = await data.aggregate([{$group: {_id:null, sum_val:{$sum:"$value"}}}])
        res.json({data:result, total:total})
    } catch (error) {
        res.json({msg:error})
    }   
}

export {ExpenseShow}