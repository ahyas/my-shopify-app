import mongoose from "mongoose"

const Schema = mongoose.Schema
const data = mongoose.model("expenses", Schema({
    id_category:mongoose.Types.ObjectId,
    information:String,
    date:String,
    value:Number
}, {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }))

const ExpenseShow = async (req, res) => {
    try {
        const result = await data.find({}).select({ id: 1, id_category: 1, information: 1, date:1, value:1 }).sort({updated_at:-1})
        let result2 = await data.aggregate([
            {
                $lookup: {
                    from:'categories',
                    localField:'id_category',
                    foreignField:'_id',
                    as:'category'
                }
            },
            {
                $unwind:'$category'
            },
            {
                $project:{'_id':1, 'category.information':1, 'date':1, 'id_category':1, 'information':1, 'value':1}
            }
        ])
        const total = await data.aggregate([{$group: {_id:null, sum_val:{$sum:"$value"}}}])
        res.json({data:result, total:total, result:result2})
    } catch (error) {
        res.json({msg:error})
    }   
}

const ExpenseSave = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.body.category);
        await data.create({
            id_category:id,
            information:req.body.information,
            date: req.body.date,
            value:req.body.value
        })
        
        res.json({msg:"Success"})
    } catch (error) {
        res.json({msg:error})
    }
}

const ExpenseView = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id);
        let result = await data.aggregate([
            { $match: { "_id": id } },
            {
                $lookup: {
                    from:'categories',
                    localField:'id_category',
                    foreignField:'_id',
                    as:'category'
                }
            },
            {
                $unwind:'$category'
            },
            {
                $project:{'_id':1, 'category.information':1, 'date':1, 'id_category':1, 'information':1, 'value':1}
            }
        ])
        res.json({msg:"Success", data:result})
    } catch (error) {
        res.json({msg:error})
    }
}

export {ExpenseShow, ExpenseSave, ExpenseView}