import React from "react";
import LeftArrow from "./LeftArrow";
import PropTypes from "prop-types";
import RightArrow from "./RightArrow";

const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {/* <img src={direction === "next" ? rightArrow : <LeftArrow />} /> */}
      {direction === "next" ? <RightArrow /> : <LeftArrow />}
    </button>
  );
};

BtnSlider.propTypes = {
  direction: PropTypes.string.isRequired,
  moveSlide: PropTypes.func.isRequired,
};

export default BtnSlider;
