import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js"
import {User} from "../model/user.model.js"

export const verifyUser = asyncHandler(async(req, _, next) => {



    const { user } = req.params
    
    let x = user.toLowerCase().replace(/ /g, '')
    
    
    
    if(!user){throw new ApiError(401,"Username not provided")}
    
    const findUser =  await User.findOne({ username:x })

    if(!findUser){throw new ApiError(401,"Unauthorized Request plz register Yourself")}

    next ()

})