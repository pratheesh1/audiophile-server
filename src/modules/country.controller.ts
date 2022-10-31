import { asyncBindApiErrCode } from "@utils/middlewares/errHandler";
import { IErrCode } from "@utils/middlewares/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getAllCountries, getCountryByCode } from "./country.repository";
import { findUniqueCountryRequestSchema } from "./country.schema";

const getAllCountriesErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function getAllCountriesController(req: Request, res: Response) {
  const countries = await getAllCountries();
  return res.status(StatusCodes.OK).json(countries);
}
const getAllCountriesControllerAsync = asyncBindApiErrCode(
  getAllCountriesController,
  getAllCountriesErrCode
);

const getCountryByCodeErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function getCountryByCodeController(req: Request, res: Response) {
  const { code } = findUniqueCountryRequestSchema.parse(req.query);
  const country = await getCountryByCode(code);

  if (!country) {
    getAllCountriesErrCode.code = StatusCodes.NOT_FOUND;
    throw new Error("Country not found");
  }

  return res.status(StatusCodes.OK).json(country);
}
const getCountryByCodeControllerAsync = asyncBindApiErrCode(
  getCountryByCodeController,
  getCountryByCodeErrCode
);

const controllers = {
  getAllCountries: getAllCountriesControllerAsync,
  getCountryByCode: getCountryByCodeControllerAsync,
};
export default controllers;
