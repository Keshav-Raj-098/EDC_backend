import { Router } from "express";
import { verifyUser } from "../middlewares/verifyuser.middleware.js";
import {createComments , readComments, readThis
        , updateComments, deleteComments} from "../controller/comment.controller.js"

const router = Router()

router.route("/c/:user/create").post(verifyUser,createComments)
router.route("/c/:user/read").get(verifyUser,readComments)
router.route("/c/:user/:key").get(verifyUser,readThis)
router.route("/c/:user/update").patch(verifyUser,updateComments)
router.route("/c/:user/:key").delete(verifyUser,deleteComments)


export default router