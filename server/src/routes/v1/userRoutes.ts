import express from "express"
import * as authControllers from "../../controllers/auth/auth"
import asyncHandler from "../../utils/asyncHandler"
import { authenticate } from "../../middlewares/authenticate"
import { authorize } from "../../middlewares/authorize"
import { Roles } from "../../types/applicationRoles"

const router=express.Router()

router.get("/getUser",authenticate,authorize[Roles.USER],asyncHandler(authControllers.login))



export default router