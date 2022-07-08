import React from "react";
import "./NewsCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <>
      {news && (
        <div className="news-card-wrapper">
          <div className="news-card-image-wrapper">
            <img src={news.image} alt={news.title} />
          </div>
          <div className="news-card-details-wrapper">
            <h2 className="news-card-title">{news.title}</h2>
            <div className="news-card-content-wrapper">
              {/* <p className="news-card-content">{news.content}</p> */}
              <div
                className="news-card-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
            <div className="news-card-link-wrapper">
              <Link
                to="/news/details"
                state={{ newsId: news._id }}
                className="news-card-link"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
