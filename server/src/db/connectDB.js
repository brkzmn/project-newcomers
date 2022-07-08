import mongoose from "mongoose";
import { logInfo } from "../util/logging.js";
mongoose.connection.on("connected", () => {
  logInfo("Connection Established");
});
mongoose.connection.on("reconnected", () => {
  logInfo("Connection Reestablished");
});
mongoose.connection.on("disconnected", () => {
  logInfo("Connection disconnected");
});
mongoose.connection.on("close", () => {
  logInfo("Connection Closed");
});
mongoose.connection.on("error", (error) => {
  logInfo("ERROR:" + error);
});
const connectDB = async () => {
  return await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
