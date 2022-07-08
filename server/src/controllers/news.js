import mongoose from "mongoose";
import News from "../models/News.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import { s3UploadFile } from "./s3Upload.js";
import fs from "fs";
import util from "util";

export const getNews = async (req, res) => {
  try {
    const userName = req.userName;
    const { newsCategory } = req.params;
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (newsCategory === "all") {
      const news = await News.find();
      if (!news) {
        throw new Error("Could not find any news in the Data base");
      } else {
        res.status(200).json({ success: true, result: news });
      }
    } else {
      const news = await News.find({
        category: { $regex: new RegExp(newsCategory, "i") },
      });
      if (!news) {
        throw new Error(`Could not find any news in ${newsCategory} category`);
      } else {
        res.status(200).json({ success: true, result: news });
      }
    }
  } catch (e) {
    res.status(500).json({ success: false, msg: `Error: ${e.message}` });
  }
};

export const getNewsDetails = async (req, res) => {
  try {
    const userName = req.userName;
    const { newsId } = req.params;

    const newsDetails = await News.find({
      _id: mongoose.Types.ObjectId(newsId),
    });
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!newsId) {
      throw new Error("News Id in undefined");
    } else if (!newsDetails) {
      throw new Error("News Details couldn't be found in the database");
    } else {
      res.status(200).json({ success: true, result: newsDetails });
    }
  } catch (e) {
    res
      .status(500)
      .json({ success: false, msg: "Unable to get news, try again later" });
  }
};

export const addNews = async (req, res) => {
  try {
    const userName = req.userName;
    const { title, content, category, sources } = req.body;
    const file = req.file;
    const user = await User.findOne({ userName });
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

    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (user.isAdmin !== true) {
      throw new Error("You need to be admin user in order to modify the News");
    } else if (!title) {
      throw new Error("News title is missed");
    } else if (!content) {
      throw new Error("News content is missed");
    } else if (!category) {
      throw new Error("News category is missed");
    } else if (!sources) {
      throw new Error("News sources is missed");
    } else if (!file) {
      throw new Error("You need to insert at least one Photo for each News");
    } else {
      return res.status(201).json({ success: true, result: createdNews });
    }
  } catch (error) {
    const errors = [];
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: `Bad Request: ${errors}` });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message}`,
      });
    }
  }
};
