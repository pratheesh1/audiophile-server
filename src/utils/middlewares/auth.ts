import { syncBindApiErrCode } from "@middlewares/errHandler";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect("/login");
}

// ------------------ Login and Logout ------------------
// implementation based on recommendations from https://github.com/expressjs/session

export function login(req: Request, res: Response, next: NextFunction): void {
  // guard against forms of session fixation
  req.session.regenerate(function (err: unknown) {
    if (err) return next(err);

    // TODO: store user information in session
    req.session.user = req.body.user;

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err: unknown) {
      if (err) return next(err);
      res.redirect(req.session.redirectUrl || "/");
    });
  });
}
export const onLoginRefreshSession = syncBindApiErrCode(login, StatusCodes.UNAUTHORIZED);

function logout(req: Request, res: Response, next: NextFunction): void {
  req.session.user = null;
  req.session.save(function (err: unknown) {
    if (err) return next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err: unknown) {
      if (err) return next(err);
      res.redirect(req.session.redirectUrl || "/");
    });
  });
}
export const onLogOutDestroySession = syncBindApiErrCode(logout, StatusCodes.INTERNAL_SERVER_ERROR);
