import express from "express";

import controllers from "./country.controller";

const countriesRouter = express.Router();

countriesRouter.get("/", controllers.getCountriesByCode);
countriesRouter.get("/all", controllers.getAllCountries);

export default countriesRouter;
