import express from "express";

import controllers from "./user.controller";

const userRouter = express.Router();

userRouter.post("/create", controllers.createUser);
userRouter.post("/login", controllers.loginUser);
userRouter.post("/logout", controllers.logoutUser);
userRouter.get("/refresh", controllers.refreshToken);

export default userRouter;
