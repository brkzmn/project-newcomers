import React, { useState } from "react";
import BtnSlider from "./BtnSlider";
import "./ActivitySlider.css";
import PropTypes from "prop-types";
import getCategoryImageUrl from "../../util/getCategoryImageUrl";
import { Link } from "react-router-dom";

const ActivitySlider = ({ activitiesData }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== activitiesData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === activitiesData.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(activitiesData.length);
    }
  };

  return (
    <>
      {activitiesData.length > 0 && (
        <div className="slider-container">
          <div className="activity-count-wrapper">
            {" "}
            {slideIndex}/{activitiesData.length}
          </div>
          {activitiesData.map((activity, index) => {
            return (
              <div
                key={index}
                className={
                  slideIndex === index + 1 ? "slide active-anim" : "slide"
                }
                style={{
                  backgroundImage: `url(${getCategoryImageUrl(
                    activity.category
                  )})`,
                }}
              >
                <h2 className="activity-title">{activity.title}</h2>

                <h3 className="activity-category">
                  <span className="act-cat-sign"> | </span>
                  {activity.category}
                </h3>
                <p className="activity-description">{activity.description}</p>
                <div className="activities-link-wrapper">
                  <Link to="/activities" className="activities-link">
                    Read More
                  </Link>
                </div>

                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"} />
              </div>
            );
          })}
        </div>
      )}
      {activitiesData.length === 0 && (
        <div className="slider-container">
          <div className="slide active-anim">
            <h2 className="activity-title">
              You don&apos;t have any activities yet
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

ActivitySlider.propTypes = {
  activitiesData: PropTypes.array.isRequired,
};

export default ActivitySlider;
