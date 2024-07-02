import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    fullname: {
        type: String,
        required:true,
    },
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    }, 
    password:{
        type: String,
        required:[true,'password is required']
    },
    
    

},{timestamps:true})





userSchema.pre("save",async function(next){
    if(this.isModified("password"))  {
        this.password = await bcrypt.hash(this.password,5)
    }
    next()
})


userSchema.pre("save",async function(next){
    if(this.isModified("username"))  {
        this.username = this.username.toLowerCase().replace(/ /g, '')
    }
    next()
})




userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}




export const User = mongoose.model("User", userSchema)