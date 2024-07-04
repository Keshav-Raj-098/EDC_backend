import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()





app.use(cors())
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))



// routes

import userRouter from "./routes/user.routes.js";
import blogsRouter from "./routes/blogs.routes.js";
import commentRouter from "./routes/comment.routes.js";


app.use("/user",userRouter) 
app.use("/blogs",blogsRouter) 
app.use("/comment",commentRouter) 








export {app}















