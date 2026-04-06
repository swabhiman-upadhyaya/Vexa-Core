import { Router } from "express";

import { registerValidator, loginValidator } from "../validators/auth.validator.js"
import { registerUserController, verifyEmailController, loginUserController, getMeController } from "../controllers/auth.controller.js"

import { authUserMiddleware } from "../middlewares/user.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerValidator, registerUserController)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {string} token - The email verification token sent to the user's email
 */
authRouter.get("/verify-email", verifyEmailController)

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return a JWT token
 * @access Public
 */
authRouter.post("/login", loginValidator, loginUserController)


authRouter.get("/get-me", authUserMiddleware, getMeController);


export default authRouter;