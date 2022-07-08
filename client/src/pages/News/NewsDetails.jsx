import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getTimeDifference from "../../util/getTimeDifference";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

import "./NewsDetails.css";

const NewsDetails = () => {
  const [newsDetails, setNewsDetails] = useState(null);
  const location = useLocation();
  const newsId = location.state?.newsId;
  const onSuccess = (response) => {
    setNewsDetails(response.result[0]);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/news/details/${newsId}`,
    onSuccess
  );

  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  let timeDifference;
  if (newsDetails) {
    const currentTime = new Date();
    const publishingTime = new Date(newsDetails.createdAt);
    timeDifference = getTimeDifference(currentTime, publishingTime);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Error>{error}</Error>}

      {newsDetails && (
        <div className="news-details-container">
          <div className="news-details-banner">
            <div className="news-details-img-wrapper">
              <img src={newsDetails.image} alt={newsDetails.title} />
            </div>
            <div className="news-details-header">
              <h2 className="news-details-title">{newsDetails.title}</h2>
              <span className="news-details-category">
                {newsDetails.category}
              </span>
              <time className="news-details-time">{timeDifference}</time>
            </div>
          </div>

          {/* <p className="news-details-content">{newsDetails.content}</p> */}
          <div
            className="news-details-content"
            dangerouslySetInnerHTML={{ __html: newsDetails.content }}
          />
          <cite className="news-details-source">{newsDetails.sources[0]}</cite>
        </div>
      )}
    </>
  );
};

export default NewsDetails;
