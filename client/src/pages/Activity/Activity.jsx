import React, { useState, useEffect, useContext } from "react";
import "./Activity.css";
import activityHero from "../../images/activity-hero.jpg";
import Select from "../../components/Forms/Select";
import useFetch from "../../hooks/useFetch";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import useUserDetails from "../../hooks/useUserDetails";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";

const Activity = () => {
  const { userDetails } = useUserDetails();
  const [activityCategory, setActivityCategory] = useState("all");
  const [activities, setActivities] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  const [activityNumber, setActivityNumber] = useState(null);

  const onSuccess = (response) => {
    setActivities(response.result);
    setActivityNumber(response.result.length);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/activities/category/${activityCategory}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, [activityCategory, activityNumber]);

  console.log(activityNumber, "activitynumber");
  return (
    <div
      className={
        isDarkMode
          ? "activity-page-container activity-page-container-dark"
          : "activity-page-container"
      }
    >
      <div
        className="create-activity-wrapper"
        style={{
          backgroundImage: `url(${activityHero})`,
        }}
      >
        {" "}
        <h2>Lets Enjoy Together</h2>
        <Link
          to="/activities/create"
          className="create-activity-link navbar-link"
        >
          Create Activity
        </Link>{" "}
      </div>
      <div className="activity-category-select-wrapper">
        <Select
          value={activityCategory}
          onChange={(value) => setActivityCategory(value)}
          options={[
            { value: "all", text: "Choose a category" },
            { value: "sport", text: "Sport" },
            { value: "language", text: "Language" },
            { value: "city tour", text: "City Tour" },
            { value: "museum", text: "Museum" },
            { value: "food", text: "Food" },
            { value: "training", text: "Training" },
            { value: "music", text: "Music" },
            { value: "volunteer work", text: "Volunteer Work" },
          ]}
        />
      </div>
      <div className="activities-wrapper">
        {isLoading && <Spinner />}
        {error && <Error>{error}</Error>}
        {}
        {activities &&
          userDetails &&
          activities.map((activity) => {
            return (
              <ActivityCard
                key={activity._id}
                activity={activity}
                userId={userDetails._id}
                setActivityNumber={setActivityNumber}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Activity;
