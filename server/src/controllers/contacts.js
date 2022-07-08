import { logError } from "../util/logging.js";
import User from "../models/User.js";

export const getContacts = async (req, res) => {
  try {
    const userName = req.userName;
    const { contactsIds } = req.body;
    const contactsUsers = await User.find({ _id: { $in: [...contactsIds] } });
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!contactsIds) {
      throw new Error("BAD REQUEST: Contacts ids are not defined.");
    } else if (!contactsUsers) {
      throw new Error("Internal Server Error: Contacts users not found.");
    } else {
      res.status(200).json({
        success: true,
        contacts: contactsUsers,
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
