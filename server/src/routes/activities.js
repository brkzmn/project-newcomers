import express from "express";
import withAuth from "../middlewares/middleware.js";
import {
  getUserActivities,
  getActivities,
  createActivity,
  deleteActivity,
  joinToActivity,
  getUserActivitiesList,
} from "../controllers/activities.js";
// import multerUpload from "../controllers/multerUpload.js";

const activitiesRouter = express.Router();

activitiesRouter.get("/user-activities", withAuth, getUserActivities);
activitiesRouter.get(
  "/user-activities-list/:userId",
  withAuth,
  getUserActivitiesList
);
activitiesRouter.get("/category/:activityCategory", withAuth, getActivities);
activitiesRouter.post("/create", withAuth, createActivity);
activitiesRouter.patch("/join/:userId", withAuth, joinToActivity);
activitiesRouter.delete("/delete", withAuth, deleteActivity);

export default activitiesRouter;
