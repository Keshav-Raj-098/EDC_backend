import { Router } from "express";
import { verifyUser } from "../middlewares/verifyuser.middleware.js";
import {createBlog , readBlog, updateBlog ,
        deleteBlog, readThis} from "../controller/posts.controller.js"

const router = Router()

router.route("/c/:user/create").post(verifyUser,createBlog)
router.route("/c/:user/read").get(verifyUser,readBlog)
router.route("/c/:user/:key").get(verifyUser,readThis)
router.route("/c/:user/update").patch(verifyUser,updateBlog)
router.route("/c/:user/:key").delete(verifyUser,deleteBlog)


export default router