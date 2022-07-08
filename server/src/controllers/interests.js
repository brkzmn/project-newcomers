import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const addInterest = async (req, res) => {
  try {
    const userName = req.userName;

    const { interest } = req.body;
    const user = await User.findOne({ userName });

    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!interest) {
      throw new Error("Please define an interest to add.");
    } else if (!user) {
      throw new Error("Internal Server Error: User not found.");
    } else {
      await User.updateOne(
        { userName },
        {
          $set: { interests: [...user.interests, interest] },
        }
      );

      return res.status(200).json({
        success: true,
        interest,
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteInterest = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    const { interest } = req.body;
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!interest) {
      throw new Error("Please define an interest to delete.");
    } else if (!user) {
      throw new Error("Internal Server Error: User not found");
    } else {
      await User.updateOne(
        {
          userName,
        },
        {
          $set: {
            interests: user.interests.filter((item) => item !== interest),
          },
        }
      );

      return res.status(200).json({
        success: true,
        interest,
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
