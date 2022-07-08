import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const addLocation = async (req, res) => {
  try {
    const userName = req.userName;

    const { province } = req.body;
    const user = await User.findOne({ userName });
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!province) {
      throw new Error("Bad Request: Location required!");
    } else if (!user) {
      throw new Error("User Not found");
    } else {
      await User.updateOne({ userName }, { $set: { province } });

      return res.status(200).json({ success: true, province });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
