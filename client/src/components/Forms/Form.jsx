import React from "react";
import PropTypes from "prop-types";
import "./Form.css";
import TEST_ID from "../../pages/User/CreateUser.testid";

const Form = ({ onSubmit, children, title, ...rest }) => {
  return (
    <div className="form-container" data-testid={TEST_ID.container}>
      <h2 className="form-header">{title}</h2>
      <form className="form" onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Form;
