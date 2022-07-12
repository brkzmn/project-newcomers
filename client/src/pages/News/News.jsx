import React, { useState, useEffect, useContext } from "react";
import "./News.css";
import newsHero from "../../images/news-hero.jpg";
import NewsCard from "../../components/NewsCard";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Select from "../../components/Forms/Select";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Spinner/Spinner";
import useUserDetails from "../../hooks/useUserDetails";
import { AuthContext } from "../../AuthContext";

const News = () => {
  const [newsData, setNewsData] = useState(null);
  const [noNews, setNoNews] = useState(null);
  const [newsCategory, setNewsCategory] = useState("all");
  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();

  const onSuccess = (response) => {
    if (!response.result) {
      setNoNews(true);
      setNewsData(null);
    } else {
      setNoNews(false);
      setNewsData(response.result);
    }
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/news/category/${newsCategory}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, [newsCategory]);

  return (
    <div className="news-container">
      <div className="news-hero-wrapper">
        <img src={newsHero} alt="" />
      </div>
      {isLoading && <Spinner />}
      {error && <Error>Sorry! We can not display the news at the moment</Error>}
      <div className="news-category-wrapper">
        <Select
          value={newsCategory}
          title=""
          placeholder="Choose a news category"
          onChange={(value) => setNewsCategory(value)}
          options={[
            { value: "all", text: "Choose a news category" },
            { value: "refugees", text: "Refugees" },
            { value: "politics", text: "Politics" },
            { value: "finance", text: "Finance" },
            { value: "society", text: "Society" },
          ]}
          required
        />
      </div>

      <div className="news-section-wrapper">
        {noNews && (
          <div className="no-news-text-wrapper">
            {" "}
            {`There is no news ${newsCategory ? `in ${newsCategory} ` : ""}`}
          </div>
        )}
        {newsData &&
          newsData.map((news, index) => {
            return <NewsCard key={index} news={news} />;
          })}
      </div>
      {isAuthenticated && userDetails && userDetails.isAdmin === true && (
        <div className="add-news-link-wrapper">
          <Link to="/news/add" className="navbar-link">
            Add News
          </Link>
        </div>
      )}
    </div>
  );
};

export default News;
