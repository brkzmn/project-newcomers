const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    sources: [String],
    images: [
      {
        alt: String,
        img: {
          data: Buffer,
          contentType: String,
        },
      },
    ],
    category: {
      type: String,
      enum: ["job", "finance", "society", "education", "culture"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", guideSchema);
