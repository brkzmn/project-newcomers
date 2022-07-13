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
import ActivityDeleteBtn from "./ActivityDeleteBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityCard = ({ activity, userId, setActivityNumber }) => {
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

  const onDeleteActivitySuccess = () => {
    toast.info("Activity deleted", {
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setActivityNumber((prevNumber) => prevNumber - 1);
  };

  const {
    error: deleteActivityError,
    performFetch: performDeleteActivityFetch,
    cancelFetch: cancelDeleteActivityFetch,
  } = useFetch("/activities/delete", onDeleteActivitySuccess);

  const handleDelete = () => {
    performDeleteActivityFetch({
      method: "DELETE",
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
    return cancelDeleteActivityFetch;
  }, []);

  const startDate = new Date(activity.startAt).toLocaleString("nl-NL");
  const endDate = new Date(activity.endAt).toLocaleString("nl-NL");

  if (deleteActivityError) {
    toast.error("Failed to delete the activity", {
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "error1",
    });
  }
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
        {userId === activity.createdBy && (
          <div
            title="Delete Activity"
            className="delete-activity-btn"
            onClick={() => {
              handleDelete();
            }}
          >
            <ActivityDeleteBtn />
          </div>
        )}

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
  userId: PropTypes.string.isRequired,
};

export default ActivityCard;
