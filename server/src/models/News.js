import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true },
    sources: [String],
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["refugees", "politics", "finance", "society"],
    },
  },
  { timestamps: true }
);
const News = mongoose.model("News", newsSchema);
export default News;
