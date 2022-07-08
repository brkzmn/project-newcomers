import express from "express";
import path from "path";
import withAuth from "../middlewares/middleware.js";
import { addNews, getNews, getNewsDetails } from "../controllers/news.js";
import multer from "multer";
import { fileURLToPath } from "url";

const newsRouter = express.Router();

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../" + "controllers/" + "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

newsRouter.get("/", withAuth, getNews);
newsRouter.get("/category/:newsCategory", withAuth, getNews);
newsRouter.get("/details/:newsId", withAuth, getNewsDetails);
newsRouter.post("/add", withAuth, upload.single("image"), addNews);

export default newsRouter;
