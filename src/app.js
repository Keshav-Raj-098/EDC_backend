import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()




app.use(cors({origin: "" ,credentials:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))



// routes

import userRouter from "./routes/user.routes.js";



// routes declaration


// the following is a middleware (use)
app.use("/user",userRouter) 








export {app}















