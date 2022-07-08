import React, { useState, useEffect } from "react";
import DashboardNewsCard from "./DashboardNewsCard";
import useFetch from "../hooks/useFetch";
import "./DashboardNews.css";
import Error from "./Error/Error";

const DashboardNews = () => {
  const [newsData, setNewsData] = useState(null);

  const onSuccess = (response) => {
    setNewsData(response.result);
  };
  const { error, performFetch, cancelFetch } = useFetch(
    "/news/category/all",
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  return (
    <div className="news-wrapper scroll-narrow">
      {error && <Error>{error}</Error>}
      {newsData && newsData.length === 0 && (
        <div className="no-news-yet-wrapper">No News Yet</div>
      )}
      {newsData &&
        newsData.map((news) => {
          return <DashboardNewsCard key={news.title} news={news} />;
        })}
    </div>
  );
};

export default DashboardNews;
