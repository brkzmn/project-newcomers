import User from "../models/User.js";
import { logInfo, logError } from "../util/logging.js";

export const findMatches = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else {
      const { province, interests } = req.body;

      if (!province || !interests) {
        throw new Error(
          "BAD REQUEST: Province & at least 1 interest are required."
        );
      } else {
        logInfo(`${province}, ${interests}`);

        // Get the logged in user
        const currentUserType = await User.findOne(
          { userName },
          { userType: 1 }
        );

        logInfo(`currentUserType ${currentUserType.userType}`);

        // Filter by province
        const usersByProvince = await User.find({
          province,
        });
        // Keeps only locals
        const usersByType = usersByProvince.filter(
          (user) => user.userType !== currentUserType.userType
        );

        // filter by Interests
        const usersByInterests = interests.map((interest) =>
          usersByType.filter((user) => user.interests.includes(interest))
        );

        const finalListOfUsers = usersByInterests.reduce(
          (acc, current) => [
            ...acc,
            ...current.filter((item) => !acc.includes(item)),
          ],
          usersByInterests[0]
        );

        if (!currentUserType) {
          throw new Error(
            "User not found in the data base or user type is undefined."
          );
        } else if (!usersByProvince) {
          throw new Error("No match found in your province");
        } else if (!usersByInterests) {
          throw new Error("No match found with same interests in your area.");
        } else if (finalListOfUsers.length === 0) {
          throw new Error(
            `There were ${finalListOfUsers.length} users matched with your preferences.`
          );
        } else {
          // Return all users but the current user.
          return res.status(200).json({
            success: true,
            users: finalListOfUsers.filter(
              (user) => user.userName !== userName
            ),
          });
        }
      }
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Error: ${error.message}`,
    });
  }
};
