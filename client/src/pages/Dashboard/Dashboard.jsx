import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate, Outlet } from "react-router-dom";
import latestNews from "../../images/refugeesnews.jpeg";
import yourConnections from "../../images/dashboardConnections.jpeg";
import useUserDetails from "../../hooks/useUserDetails";
import ActivitySlider from "../../components/ActivitySlider/ActivitySlider";
import useFetch from "../../hooks/useFetch";
import DashboardNews from "../../components/DashboardNews";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import { Buffer } from "buffer";

const Dashboard = () => {
  const [userActivities, setUserActivities] = useState(null);
  const { userDetails, isMeLoading, meError, cancelMeFetch } = useUserDetails();
  const [userRecommendedActivities, setUserRecommendedActivities] =
    useState(null);
  const navigate = useNavigate();
  const onSuccess = (response) => {
    setUserActivities(response.result.upcomingActivities);
    setUserRecommendedActivities(response.result.recommendedActivities);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/activities/user-activities",
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });
  }, []);
  useEffect(() => {
    return () => {
      cancelMeFetch();
      cancelFetch();
    };
  }, []);

  return (
    <div className="dashboard-container">
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <div className="user-info-wrapper">
        <h2 className="user-header dashboard-header-title">
          {userDetails &&
            `Welcome, ${userDetails.firstName} ${userDetails.lastName}`}
        </h2>
        <div className="user-img-container">
          <img
            src={
              userDetails && userDetails.profileImage
                ? `data:image/${
                    userDetails.profileImage.contentType
                  };base64,${Buffer.from(
                    userDetails.profileImage.data.data
                  ).toString("base64")}`
                : "https://picsum.photos/200"
            }
            alt={userDetails && userDetails.firstName}
          />
        </div>
        <div className="dashboard-header-btn-wrapper">
          <Button onClick={() => navigate("changephoto")} className="btn-guide">
            Change my profile image
          </Button>
          <Button
            onClick={() => navigate("changepassword")}
            className="btn-guide dashboard-header-btn"
          >
            Change my password
          </Button>
        </div>
      </div>
      <Outlet />
      <div className="user-activity-wrapper">
        <div className="upcoming-activities-wrapper activity-wrapper">
          <h3 className="activity-wrapper-header">Upcoming Activities</h3>
          {isLoading && <Spinner />}
          {error && <Error>{error}</Error>}
          {userActivities && <ActivitySlider activitiesData={userActivities} />}
        </div>
        <div className="recommended-activities-wrapper activity-wrapper">
          {isLoading && <Spinner />}
          {error && <Error>{error}</Error>}
          {userDetails && (
            <h3 className="activity-wrapper-header"> Recommended Activities</h3>
          )}
          {userRecommendedActivities && (
            <ActivitySlider activitiesData={userRecommendedActivities} />
          )}
        </div>
      </div>
      <div className="latest-news-wrapper">
        <div className="latest-news-img-wrapper">
          <img src={latestNews} alt="latest-news" className="latest-news-img" />
        </div>
        <div className="latest-news-details-wrapper scroll-narrow">
          <h2 className="latest-news-header">Latest News About Newcomers</h2>
          <DashboardNews />
        </div>
      </div>
      <div className="connections-status-wrapper">
        <div className="connections-status-img-wrapper">
          <img
            src={yourConnections}
            alt="your-connections"
            className="connections-status-img"
          />
        </div>
        <div className="connections-status-details-wrapper">
          {userDetails && <RecentConnections />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
