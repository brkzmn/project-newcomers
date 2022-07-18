import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
// import * as fs from "node:fs";
// import path from "path";
// import { fileURLToPath } from "url";
import * as bcrypt from "bcrypt";
import s3UploadFile from "./s3UploadFile.js";
import handleRequestError from "../util/handleRequestError.js";
import createRequestError from "../util/createRequestError.js";
import fs from "fs";
import util from "util";

export const getLoggedInUser = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    if (!userName) {
      throw new Error("You are not Authenticated");
    } else if (!user) {
      throw new Error("User not found");
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: `Error: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    if ("token" in req.cookies && "userStatus" in req.cookies) {
      return res
        .status(200)
        .clearCookie("token")
        .clearCookie("userStatus")
        .json({
          success: true,
        });
    } else {
      throw new Error("You are not Authenticated");
    }
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: `Error: ${error.message}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      userType,
      email,
      password,
      phoneNumber,
      birthDay,
    } = req.body;
    // let user;

    const user = {
      firstName,
      lastName,
      userName,
      userType,
      email,
      password,
      phoneNumber,
      birthDay,
    };
    const errorList = validateUser(user);
    if (typeof user !== "object") {
      throw new Error(
        `BAD REQUEST: You need to provide a 'user' object. Received: ${typeof user}`
      );
    } else if (errorList.length > 0) {
      logError(errorList);
      throw new Error(validationErrorMessage(errorList));
    } else {
      const newUser = await User.create(user);

      if (req.file) {
        const file = req.file;
        file.filename = `${userName}.jpg`;
        const uploadedImage = await s3UploadFile(file);

        await User.updateOne(
          { userName },
          {
            $set: { profileImage: uploadedImage.Location },
          }
        );

        const newUserWithImage = await User.find({ userName: userName });

        //delete image from project server
        const unlinkFile = util.promisify(fs.unlink);
        unlinkFile(file.path);

        return res.status(201).json({ success: true, user: newUserWithImage });
      } else {
        return res.status(201).json({ success: true, user: newUser });
      }
    }
  } catch (error) {
    let errors = [];
    logError(error.errors);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errors) });
    } else {
      logError(error);
      return res
        .status(500)
        .json({ success: false, msg: `Error: ${error.message}` });
    }
  }
};

export const changeProfileImage = async (req, res) => {
  try {
    const userName = req.userName;
    if (!req.file) {
      createRequestError("An image has not been selected to update", 400);
    }

    const file = req.file;
    file.filename = `${userName}.jpg`;
    const newProfileImage = await s3UploadFile(file);

    await User.updateOne(
      { userName },
      {
        $set: { profileImage: newProfileImage.Location },
      }
    );

    const updatedUser = await User.findOne({ userName });
    //delete image from project server
    const unlinkFile = util.promisify(fs.unlink);
    unlinkFile(file.path);

    return res.status(200).json({
      success: true,
      msg: "we got the new Image",
      user: updatedUser,
    });
  } catch (error) {
    handleRequestError(error, res);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userName = req.userName;
    const user = await User.findOne({ userName });

    if (!userName) {
      throw new Error("BAD REQUEST: You are not authenticated");
    } else if (!oldPassword) {
      throw new Error(
        "BAD REQUEST: Please include your old password in the request"
      );
    } else if (!user) {
      throw new Error("USER NOT FOUND: try again later.");
    } else {
      const same = await user.isCorrectPassword(oldPassword);
      if (!same) {
        throw new Error("NOT FOUND: Incorrect password");
      } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        await User.updateOne(
          { userName },
          {
            $set: { password: hashedNewPassword },
          }
        );
        const updatedUser = await User.findOne({ userName });
        return res.status(200).json({
          success: true,
          msg: "password updated",
          user: updatedUser,
        });
      }
    }
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: `Error: ${error.message}` });
  }
};
