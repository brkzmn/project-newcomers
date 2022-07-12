import mongoose from "mongoose";
import News from "../models/News.js";
// import User from "../models/User.js";
// import { logError } from "../util/logging.js";
import { s3UploadFile } from "./s3Upload.js";
import fs from "fs";
import util from "util";
import handleRequestError from "../util/handleRequestError.js";
import createRequestError from "../util/createRequestError.js";

export const getNews = async (req, res) => {
  try {
    const { newsCategory } = req.params;

    if (newsCategory === "all") {
      const news = await News.find();
      if (news.length === 0) {
        res.status(204).send();
      } else {
        res.status(200).json({ success: true, result: news });
      }
    } else {
      const news = await News.find({
        category: { $regex: new RegExp(newsCategory, "i") },
      });

      if (news.length === 0) {
        res.status(204).send();
      } else {
        res.status(200).json({ success: true, result: news });
      }
    }
  } catch (error) {
    handleRequestError(error, res);
  }
};

export const getNewsDetails = async (req, res) => {
  try {
    const { newsId } = req.params;

    const newsDetails = await News.find({
      _id: mongoose.Types.ObjectId(newsId),
    });

    if (!newsId) {
      createRequestError("News Id in undefined", 400);
    }

    if (!newsDetails) {
      res.status(204).send();
    } else {
      res.status(200).json({ success: true, result: newsDetails });
    }
  } catch (error) {
    handleRequestError(error, res);
  }
};

export const addNews = async (req, res) => {
  try {
    const { title, content, category, sources } = req.body;
    const file = req.file;

    if (title.length > 200) {
      createRequestError(
        "Title is too long. It Should be max 200 characters",
        400
      );
    } else if (!file) {
      createRequestError("You need to insert news image", 400);
    } else {
      const uploadedImage = await s3UploadFile(file);
      const news = {
        title,
        content,
        category,
        sources,
        image: uploadedImage.Location,
      };
      const createdNews = await News.create(news);
      const unlinkFile = util.promisify(fs.unlink);

      unlinkFile(file.path);
      return res.status(201).json({ success: true, result: createdNews });
    }
  } catch (error) {
    handleRequestError(error, res);
  }
};
