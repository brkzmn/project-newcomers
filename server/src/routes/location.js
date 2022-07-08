import express from "express";
import { addLocation } from "../controllers/location.js";
import withAuth from "./../middlewares/middleware.js";

const locationRouter = express.Router();

locationRouter.post("/add", withAuth, addLocation);

export default locationRouter;
