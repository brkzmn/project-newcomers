import React from "react";
import "./DashboardNewsCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardNewsCard = ({ news }) => {
  return (
    <>
      {news && (
        <div className="dashboard-news-card-wrapper">
          <h3 style={{ marginTop: "1rem" }}>{news.title}</h3>
          <div className="dashboard-news-content-wrapper">
            <div className="news-dashboard-img-wrapper">
              <img
                src={news.image}
                alt={news.title}
                style={{ width: "6rem", height: "auto", display: "inline" }}
              />
            </div>
            <div>
              <div
                className="news-card-content"
                dangerouslySetInnerHTML={{
                  __html: news.content.slice(0, 120) + "...    ",
                }}
              />
              <Link
                to="/news/details"
                state={{ newsId: news._id }}
                className="dashboard-news-card-link"
              >
                Read More
              </Link>
            </div>
            {/* 
            <p className="dashboard-news-card-content">
              {news.content.slice(0, 120) + "...    "}
              {
                <Link
                  to="/news/details"
                  state={{ newsId: news._id }}
                  className="dashboard-news-card-link"
                >
                  Read More
                </Link>
              }
            </p> */}
          </div>
          <h4 style={{ textAlign: "end", fontSize: "0.8rem" }}>
            Category: {news.category.replace(/^./, (str) => str.toUpperCase())}
          </h4>
        </div>
      )}
    </>
  );
};

export default DashboardNewsCard;

DashboardNewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
