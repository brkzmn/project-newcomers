import mongoose from "mongoose";
//import User from "./User"
export const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "User",
    },
    body: {
      type: String,
      maxLength: 255,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seen: Boolean,
    edited: Boolean,
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", MessageSchema);
MessageSchema.statics.latest = (se) => {
  return Message.aggregate([
    {
      $match: {
        $or: [
          {
            receiver: mongoose.Types.ObjectId(se),
          },
          {
            sender: mongoose.Types.ObjectId(se),
          },
        ],
      },
    },
    {
      $sort: {
        updatedAt: 1,
      },
    },
    {
      $group: {
        _id: {
          $cond: [
            {
              $eq: ["$receiver", mongoose.Types.ObjectId(se)],
            },
            {
              $concat: [
                {
                  $toString: "$receiver",
                },
                " and ",
                {
                  $toString: "$sender",
                },
              ],
            },
            {
              $concat: [
                {
                  $toString: "$sender",
                },
                " and ",
                {
                  $toString: "$receiver",
                },
              ],
            },
          ],
        },
        updatedAt: {
          $first: "$updatedAt",
        },
        messages: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
    {
      $addFields: {
        messages: {
          $slice: ["$messages", 20],
        },
      },
    },
  ]);
};
