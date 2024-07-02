import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({

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
        unique:true
     }

},{timestamps:true})

export const Comment = mongoose.model("Comment", commentSchema)