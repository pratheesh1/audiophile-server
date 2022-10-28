import docsController  from "@modules/docs/docs.controller";
import Express, { Router } from "express";


const docsRouter = Express.Router();

docsRouter.get("/", (req, res) => res.status(200).send("Docs are on the way!"));
docsRouter.get("/db", docsController);

export default docsRouter;
