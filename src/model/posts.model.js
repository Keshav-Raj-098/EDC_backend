import mongoose, { Schema } from "mongoose";

const blogpost = new Schema({

   title:{
      type:String,
      required:true,
      unique:true,
      trim:true
   },
   content:{
      type:String,
      required:true
   },
   author:{
      type: String,
      required:true
   },
   key:{
      type:String,
      lowercase: true,
   }

},{timestamps:true})



export const Blogs = mongoose.model("Blogs", blogpost)