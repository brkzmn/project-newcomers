import Activity from "../models/Activity.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { logInfo } from "../util/logging.js";
import handleRequestError from "../util/handleRequestError.js";

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

    res.status(200).json({
      success: true,
      result: { upcomingActivities, recommendedActivities },
    });
  } catch (error) {
    handleRequestError(error, res);
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
    handleRequestError(error, res);
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
    handleRequestError(error, res);
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const userName = req.userName;
    logInfo(userName);
  } catch (error) {
    handleRequestError(error, res);
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
    });
  } catch (error) {
    handleRequestError(error, res);
  }
};

export const getUserActivitiesList = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDetails = await User.find({
      _id: mongoose.Types.ObjectId(userId),
    });
    const getUserActivitiesList = userDetails[0].activities;

    return res.status(200).json({
      success: true,
      getUserActivitiesList,
    });
  } catch (error) {
    handleRequestError(error, res);
  }
};
