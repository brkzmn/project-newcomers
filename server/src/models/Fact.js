const mongoose = require("mongoose");

const factSchema = new mongoose.Schema(
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
      enum: ["population", "working", "education", "family", "politics"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fact", factSchema);
