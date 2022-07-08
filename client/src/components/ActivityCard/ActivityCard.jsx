import React, { useEffect, useState, useContext } from "react";
import "./ActivityCard.css";
import PropTypes from "prop-types";
import getCategoryImageUrl from "../../util/getCategoryImageUrl";
import JoinSvg from "./icons/JoinSvg";
import useFetch from "../../hooks/useFetch";
import Error from "../Error/Error";
import CheckMarkSvg from "./icons/CheckMarkSvg";
import { ThemeContext } from "../../ThemeContext";
import { MdTimer, MdTimerOff, MdOutlineLocationOn } from "react-icons/md";
import { IconContext } from "react-icons";

const ActivityCard = ({ activity, userId }) => {
  const [userIsJoining, setUserIsJoining] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);

  const onSuccess = (response) => {
    if (response) {
      setUserIsJoining(response.userIsJoining);
    }
  };

  const { error, performFetch, cancelFetch } = useFetch(
    `/activities/join/${userId}`,
    onSuccess
  );

  const handleJoin = () => {
    //logInfo(email, password);

    performFetch({
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        activityId: activity._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  const onGetUserActivitiesSuccess = (response) => {
    setUserIsJoining(response.getUserActivitiesList.includes(activity._id));
  };
  const {
    // isLoading: isUserActivitiesLoading,
    // error: userActivitiesError,
    performFetch: performActivitiesFetch,
    cancelFetch: cancelActivitiesFetch,
  } = useFetch(
    `/activities/user-activities-list/${userId}`,
    onGetUserActivitiesSuccess
  );

  useEffect(() => {
    performActivitiesFetch({
      credentials: "include",
    });

    return cancelActivitiesFetch;
  }, [userIsJoining]);

  const startDate = new Date(activity.startAt).toLocaleString("nl-NL");
  const endDate = new Date(activity.endAt).toLocaleString("nl-NL");

  return (
    <IconContext.Provider
      value={{
        size: "0.70rem",
        className: "react-activity-icon",
      }}
    >
      <div
        className={
          isDarkMode
            ? "activity-card-wrapper activity-card-wrapper-dark"
            : "activity-card-wrapper"
        }
      >
        <div className="activity-card-image-wrapper">
          <img src={getCategoryImageUrl(activity.category)} alt="" />
        </div>

        <h4 className="activity-card-content-padding activity-card-title">
          {activity.title}
        </h4>
        <span className="activity-card-content-padding activity-card-category">
          {activity.category}
        </span>

        <time className="activity-card-content-padding activity-card-time">
          <span className="activity-span">
            <MdTimer />
          </span>{" "}
          Start at: {startDate}
        </time>
        <time className="activity-card-content-padding activity-card-time">
          <span className="activity-span">
            <MdTimerOff />
          </span>{" "}
          End at: {endDate}
        </time>
        <p className="activity-card-content-padding activity-card-description">
          {activity.description}
        </p>
        <span className="activity-card-content-padding activity-card-attendees">{`Attendees: ${activity.joinedBy.length}/${activity.maxPeople}`}</span>
        <p className="activity-card-content-padding location-span">
          <span className="">
            {<MdOutlineLocationOn className="location-icon" />}
          </span>
          {activity.location.city}
        </p>
        <div
          title="Join"
          onClick={() => {
            handleJoin();
          }}
        >
          {
            <div>
              {userIsJoining ? (
                <div className="join-icon-wrapper">
                  {" "}
                  <span> Cancel Activity</span>
                  <CheckMarkSvg />
                </div>
              ) : (
                <div className="join-icon-wrapper">
                  <span>Join Activity</span>
                  <JoinSvg />
                </div>
              )}
            </div>
          }
        </div>
        <div>{error && <Error>{error}</Error>}</div>
      </div>
    </IconContext.Provider>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ActivityCard;
