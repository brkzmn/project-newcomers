import express from "express";
import path from "path";
import {
  createUser,
  getLoggedInUser,
  logout,
  changeProfileImage,
  changePassword,
} from "../controllers/user.js";
import withAuth from "../middlewares/middleware.js";
import getUserRecentChat from "../controllers/userChat.js";
import multer from "multer";
const userRouter = express.Router();
import { fileURLToPath } from "url";

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

userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", upload.single("profileImage"), createUser);
userRouter.get("/contacts", withAuth, getUserRecentChat);
userRouter.post(
  "/changephoto",
  withAuth,
  upload.single("profileImage"),
  changeProfileImage
);
userRouter.post("/changepassword", withAuth, changePassword);

export default userRouter;
