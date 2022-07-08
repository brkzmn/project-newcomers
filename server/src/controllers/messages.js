import { logError } from "../util/logging.js";
import User from "../models/User.js";

export const getMessages = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: `Server Error: ${error.message}`,
    });
  }
};
export const postMessage = async (req, res) => {
  try {
    const userName = req.userName;
    const { message } = req.body;
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else {
      const receiverObject = await User.findOne({ _id: message.receiver });
      if (!receiverObject) {
        throw new Error("Receiver user not found in the data base");
      } else {
        return res.status(200).json({
          success: true,
          message: message,
          receiverObj: receiverObject,
        });
      }
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      success: false,
      msg: `Server Error: ${error.message}`,
    });
  }
};
