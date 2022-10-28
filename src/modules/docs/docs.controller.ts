import { syncBindApiErrCode } from "@/utils/middleware";
import Express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const docsRouter = Express.Router();
const errCode = StatusCodes.INTERNAL_SERVER_ERROR;

function docsController(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("db-docs");
}

export default syncBindApiErrCode(docsController, errCode);