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
import blogsRouter from "./routes/blogs.routes.js";


app.use("/user",userRouter) 
app.use("/blogs",blogsRouter) 








export {app}















