import { Router } from "express";
import { userRegisteration, userlogin } from "../controller/user.controller.js";

const router = Router()

router.route("/register").post(userRegisteration)
router.route("/login").post(userlogin)

export default router;