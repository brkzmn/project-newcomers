import Activity from "../models/Activity.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { logError, logInfo } from "../util/logging.js";

export const getUserActivities = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    const upcomingActivities = await Activity.find({
      joinedBy: { $in: [mongoose.Types.ObjectId(user._id)] },
    });

    const recommendedActivities = await Activity.find({
      joinedBy: { $ne: mongoose.Types.ObjectId(user._id) },
    });
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!user) {
      throw new Error("Internal Server Error: User not found");
    } else if (!upcomingActivities && !recommendedActivities) {
      throw new Error("There is no upcoming or recommended activities");
    } else {
      res.status(200).json({
        success: true,
        result: { upcomingActivities, recommendedActivities },
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: `Error in Fetching User Activities: ${e.message}`,
    });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { activityCategory } = req.params;
    if (activityCategory == "all") {
      const activities = await Activity.find();

      res.status(200).json({
        success: true,
        result: activities,
      });
    } else {
      const activities = await Activity.find({
        category: { $regex: new RegExp(activityCategory, "i") },
      });

      res.status(200).json({
        success: true,
        result: activities,
      });
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

export const createActivity = async (req, res) => {
  try {
    const {
      title,
      category,
      createdBy,
      startAt,
      endAt,
      description,
      location,
      maxPeople,
    } = req.body;

    const activity = {
      title,
      category,
      createdBy,
      startAt,
      endAt,
      description,
      location,
      maxPeople,
    };

    const createdActivity = await Activity.create(activity);

    return res.status(201).json({ success: true, result: createdActivity });
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
        msg: `Server Error: ${error.message} not uploaded`,
      });
    }
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const userName = req.userName;
    logInfo(userName);
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

export const joinToActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const isUserJoining = await User.find({
      $and: [
        { _id: mongoose.Types.ObjectId(userId) },
        { activities: { $in: [mongoose.Types.ObjectId(req.body.activityId)] } },
      ],
    });

    if (isUserJoining.length === 0) {
      await User.updateOne(
        { _id: mongoose.Types.ObjectId(userId) },
        {
          $addToSet: {
            activities: mongoose.Types.ObjectId(req.body.activityId),
          },
        }
      );
      await Activity.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.activityId) },
        {
          $addToSet: {
            joinedBy: mongoose.Types.ObjectId(userId),
          },
        }
      );
    } else {
      await User.updateOne(
        { _id: mongoose.Types.ObjectId(userId) },
        { $pull: { activities: mongoose.Types.ObjectId(req.body.activityId) } }
      );
      await Activity.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.activityId) },
        { $pull: { joinedBy: mongoose.Types.ObjectId(userId) } }
      );
    }

    res.status(200).json({
      success: true,
      // userJoiningStatus,
    });
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

export const getUserActivitiesList = async (req, res) => {
  try {
    const { userId } = req.params;

    const userDetails = await User.find({
      _id: mongoose.Types.ObjectId(userId),
    });

    const getUserActivitiesList = userDetails[0].activities;
    res.status(200).json({
      success: true,
      getUserActivitiesList,
    });
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
