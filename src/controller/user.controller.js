import {User} from "../model/user.model.js"
import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/Apierror.js"
import { userhtml } from "../utils/sendhtml.utils.js"






const userRegisteration = asyncHandler(async(req,res)=>{

const {fullname,username,email,password,} = req.body
 
  
    // checking all fields are present or not expect photo 

    if(!fullname){throw new ApiError(401,"please provide name")}
    if(!username){throw new ApiError(401,"please provide username")}
    if(!email){throw new ApiError(401,"please provide email")}
    if(!password){throw new ApiError(401,"please provide password")}

    const existinguser = await User.findOne({

        $or : [{ username }, { email }]
    })

    if(existinguser){
        throw new ApiError(401,"Username or email exist ")
    }

   const user = await User.create({username,fullname,password,email})
   return res.status(200).send(userhtml(user,"User registered Successfully"))
   
    

})








const userlogin = asyncHandler(async(req,res)=>{

    const {username , password} = req.body

    if(!username){throw new ApiError(401,"Please provide username ")}
    if(!password){throw new ApiError(401,"password required ")}

    const findUser = await User.findOne({username}) 

    if(!findUser){throw new ApiError(401,"Username Not Exist")}

    const isPasswordValid = await findUser.isPasswordCorrect(password)

    if (!isPasswordValid) {throw new ApiError(401, "Invalid password")}


    const user = await User.findById(findUser._id).select("-password")

    return res.status(200).send(userhtml(user,"User logged in Successfully"))
    
})

export {userRegisteration,userlogin}