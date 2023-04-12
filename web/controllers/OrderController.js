//const Orders = require("../models/OrderModel")
import mongoose from "mongoose";
//import OrderModel from "../models/OrderModel.js";
const Schema = mongoose.Schema
const data = mongoose.model("Orders", Schema({
  id:Number,
  order:String,
  date:String,
  customer:String,
  total:String,
}))

async function ShowOrder(req, res){
    try {
      const list = await data.find({})
        res.json(list)
    } catch (error) {
        console.log(error)
        res.json({msg:error})
    }
} 

async function SaveOrder(req, res){
  try {
      const list = req.body
      console.log(list)
      await data.create(list)
      res.json({msg:"Success"})
  } catch (error) {
      console.log(error)
      res.json({msg:error})
  }
} 

async function EditOrder(req, res) {
  try {
    let {id} = req.params
    let item = await data.findOne({id:id})    
    console.log(item)
    res.json(item)
  } catch (error) {
    res.json(error)
  }
}

export {ShowOrder, SaveOrder, EditOrder}