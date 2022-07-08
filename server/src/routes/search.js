import express from "express";
import { findMatches } from "../controllers/search.js";
import withAuth from "./../middlewares/middleware.js";

const searchRouter = express.Router();

searchRouter.post("/", withAuth, findMatches);

export default searchRouter;
