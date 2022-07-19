import express from "express";
import {
  createUser,
  getLoggedInUser,
  logout,
  changeProfileImage,
  changePassword,
} from "../controllers/user.js";
import withAuth from "../middlewares/middleware.js";
import getUserRecentChat from "../controllers/userChat.js";
const userRouter = express.Router();
import multerUpload from "../controllers/multerUpload.js";

userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", multerUpload.single("profileImage"), createUser);
userRouter.get("/contacts", withAuth, getUserRecentChat);
userRouter.post(
  "/changephoto",
  withAuth,
  multerUpload.single("profileImage"),
  changeProfileImage
);
userRouter.post("/changepassword", withAuth, changePassword);

export default userRouter;
