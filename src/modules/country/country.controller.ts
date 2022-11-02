import { asyncBindApiErrCode } from "@utils/middlewares/errHandler";
import { IErrCode } from "@utils/middlewares/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { castArray } from "lodash";

import { getAllCountries, getCountriesByCode } from "./country.repository";
import { findCountriesByCodeRequestSchema } from "./country.schema";

// Get all countries
const getAllCountriesErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function getAllCountriesController(req: Request, res: Response) {
  const countries = await getAllCountries();
  return res.status(StatusCodes.OK).json(countries);
}
const getAllCountriesControllerAsync = asyncBindApiErrCode(
  getAllCountriesController,
  getAllCountriesErrCode
);

// Get country by code
const getCountriesByCodeErrCode: IErrCode = { code: StatusCodes.INTERNAL_SERVER_ERROR };
async function getCountriesByCodeController(req: Request, res: Response) {
  const codes = await findCountriesByCodeRequestSchema.parseAsync(castArray(req.query.code));
  const countries = await getCountriesByCode(codes);

  if (!countries.length) {
    getAllCountriesErrCode.code = StatusCodes.NOT_FOUND;
    throw new Error("Country not found");
  }

  return res.status(StatusCodes.OK).json(countries);
}
const getCountryByCodeControllerAsync = asyncBindApiErrCode(
  getCountriesByCodeController,
  getCountriesByCodeErrCode
);

// Export all controllers
const controllers = {
  getAllCountries: getAllCountriesControllerAsync,
  getCountriesByCode: getCountryByCodeControllerAsync,
};
export default controllers;
