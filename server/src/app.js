import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import authenticateRouter from "./routes/authenticate.js";
import withAuth from "./middlewares/middleware.js";
import interestRouter from "./routes/interests.js";
import locationRouter from "./routes/location.js";
import searchRouter from "./routes/search.js";
import newsRouter from "./routes/news.js";
import activitiesRouter from "./routes/activities.js";
import messagesRouter from "./routes/messages.js";
import contactsRouter from "./routes/contacts.js";
import contactUsRouter from "./routes/contactUs.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
// Create an express server
const app = express();
const allowedOrigins = [
  "http://localhost:8080",
  "https://c35-newcomers-develop.herokuapp.com",
  "http://c35-newcomers-develop.herokuapp.com",
];
// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Add middleware so that can express can parse cookies passed by our browser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/authenticate", authenticateRouter);
app.use("/api/interest", interestRouter);
app.use("/api/province", locationRouter);
app.use("/api/find_matches", searchRouter);
app.use("/api/news", newsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/contact-us", contactUsRouter);
app.get("/checkToken", withAuth, function (req, res) {
  res.status(200);
  res.send("token is there");
});
export default app;
