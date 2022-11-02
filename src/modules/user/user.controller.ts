import { asyncBindApiErrCode } from "@utils/middlewares/errHandler";
import { IErrCode } from "@utils/middlewares/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  createUserRequestSchema,
  loginUserRequestSchema,
  logoutUserRequestSchema,
} from "./user.schema";
import userServices from "./user.services";

// Create user
const createUserErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function createUserController(req: Request, res: Response) {
  const user = await createUserRequestSchema.parseAsync(req.body);
  const createdUser = await userServices.createUser(user);

  req.session.user = {
    id: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
  };

  return res.status(StatusCodes.CREATED).json({
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.fullName,
    accessToken: createdUser.accessToken,
    refreshToken: createdUser.refreshToken,
  });
}
const createUserControllerAsync = asyncBindApiErrCode(createUserController, createUserErrCode);

// Login user
const loginUserErrCode: IErrCode = { code: StatusCodes.UNAUTHORIZED };
async function loginUserController(req: Request, res: Response) {
  const user = await loginUserRequestSchema.parseAsync(req.body);
  const loggedInUser = await userServices.loginUser(user.email, user.password);

  req.session.user = {
    id: loggedInUser.id,
    email: loggedInUser.email,
    role: loggedInUser.role,
  };

  return res.status(StatusCodes.OK).json({
    id: loggedInUser.id,
    email: loggedInUser.email,
    name: loggedInUser.fullName,
    accessToken: loggedInUser.accessToken,
    refreshToken: loggedInUser.refreshToken,
  });
}
const loginUserControllerAsync = asyncBindApiErrCode(loginUserController, loginUserErrCode);

// Logout user
const logoutUserErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function logoutUserController(req: Request, res: Response) {
  const { email } = await logoutUserRequestSchema.parseAsync(req.body);
  await userServices.logoutUser(email);
  return res.status(StatusCodes.NO_CONTENT).send();
}
const logoutUserControllerAsync = asyncBindApiErrCode(logoutUserController, logoutUserErrCode);

// Refresh token
const refreshTokenErrCode: IErrCode = { code: StatusCodes.UNAUTHORIZED };
async function refreshTokenController(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new Error("Refresh token is required");

  const newAccessToken = await userServices.refreshAccessToken(refreshToken);
  return res.status(StatusCodes.OK).json({
    accessToken: newAccessToken,
  });
}
const refreshTokenControllerAsync = asyncBindApiErrCode(
  refreshTokenController,
  refreshTokenErrCode
);

// Export all controllers
const controllers = {
  createUser: createUserControllerAsync,
  loginUser: loginUserControllerAsync,
  logoutUser: logoutUserControllerAsync,
  refreshToken: refreshTokenControllerAsync,
};
export default controllers;
