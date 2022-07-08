import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatParticipants: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    maxUsers: Number,
    isAllowed: Boolean,
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
