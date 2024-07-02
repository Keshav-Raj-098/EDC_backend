import { Router } from "express";
import {createBlog , readBlog, updateBlog , deleteBlog, readThis} from "../controller/posts.controller.js"

const router = Router()

router.route("/create").post(createBlog)
router.route("/read").get(readBlog)
router.route("/c/:key").get(readThis)
router.route("/update").patch(updateBlog)
router.route("/c/:key").delete(deleteBlog)


export default router