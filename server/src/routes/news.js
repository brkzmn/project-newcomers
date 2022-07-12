import express from "express";
import withAuth from "../middlewares/middleware.js";
import { addNews, getNews, getNewsDetails } from "../controllers/news.js";
import multerUpload from "../controllers/multerUpload.js";
const newsRouter = express.Router();

newsRouter.get("/", withAuth, getNews);
newsRouter.get("/category/:newsCategory", withAuth, getNews);
newsRouter.get("/details/:newsId", withAuth, getNewsDetails);
newsRouter.post("/add", withAuth, multerUpload.single("image"), addNews);

export default newsRouter;
