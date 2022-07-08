import express from "express";
import { addInterest, deleteInterest } from "../controllers/interests.js";
import withAuth from "../middlewares/middleware.js";

const interestRouter = express.Router();

interestRouter.post("/add", withAuth, addInterest);
interestRouter.post("/delete", withAuth, deleteInterest);

export default interestRouter;
