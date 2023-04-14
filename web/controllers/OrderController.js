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

async function DetailOrder(req, res){
  try {
    let {id} = req.params
    let list = await data.find({id:id})
    console.log(list)
    res.json(list)
  } catch (error) {
    console.log(error)
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

async function UpdateOrder(req, res){
  try {
    let {id} = req.params
    await data.findOneAndUpdate({id:id}, req.body)
    res.json({msg:"Update success"})
  } catch (error) {
    res.json(error)
  }
}

async function DeleteOrder(req, res){
  try {
    await data.findOneAndDelete({id:req.params.id})
    res.json({msg:"Success"})
  } catch (error) {
    res.json(error)
  }
}

export {ShowOrder, SaveOrder, EditOrder, UpdateOrder, DetailOrder, DeleteOrder}