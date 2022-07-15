import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

const getUserRecentChat = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    //find last 10 chats
    const recentChats = await Chat.find({
      chatParticipants: { $in: [mongoose.Types.ObjectId(user._id)] },
    })
      .sort({ timestamp: -1 })
      .limit(100);

    const recentChatParticipants = [];
    recentChats.forEach((chat) => {
      chat.chatParticipants.forEach((participant) => {
        if (participant !== user._id) {
          recentChatParticipants.push(participant);
        }
      });
    });

    res.status(200).json({ success: true, result: recentChatParticipants });
  } catch (error) {
    res.send({ msg: "Error in Fetching recent chat" });
  }
};

export default getUserRecentChat;
