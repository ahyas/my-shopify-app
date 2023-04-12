import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default function OrderModel(){
    // mongoose.Schema({
    //     id:String,
    //     order:String,
    //     date:String,
    //     customer:String,
    //     total:String,
    // })
    new Schema({
        id:String,
        order:String,
        date:String,
        customer:String,
        total:String,
    })
}
//module.exports = mongoose.model('Orders', collection)
