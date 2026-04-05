import { Router } from "express";

import { registerValidator, validate } from "../validators/auth.validator.js"
import { registerUserController } from "../controllers/auth.controller.js"


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerValidator, registerUserController)


export default authRouter;