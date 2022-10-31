import express from "express";

import controllers from "./country.controller";

const countriesRouter = express.Router();

countriesRouter.get("/", controllers.getCountryByCodeController);
countriesRouter.get("/all", controllers.getAllCountriesController);

export default countriesRouter;
