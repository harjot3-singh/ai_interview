const express = require('express')
const authRouter = express.Router()
const authController = require("../controllers/auth.controller.js")
const authMiddleWare = require("../middlewares/auth.middleWare.js")

/** 
 @route POST /api/auth/register
 @description register a new user
*/
authRouter.post("/register", authController.registerUserController)
/**
 * @route POST /api/auth/login
 * @description login user
 * @access public
 */
authRouter.post("/login",authController.loginUserController)
/**
 * @route GET api/auth/logout
 * @description clear cookie
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)
/**
 * @route GET/ api/auth/get-me
 * @description get the current user details
 * 
 */
authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController)


module.exports= authRouter;
