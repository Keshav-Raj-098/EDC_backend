import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({

 description:{
    type:String,
    required:true,
 },
 owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
 },
 rating:{
    type:Number,
    required:true
 }


},{timestamps:true})

const Review = mongoose.model("Review", reviewSchema)