import PropTypes from "prop-types";
import React from "react";

export default function ErrorText(props) {
  const { text, className } = props;
  return (
    <p className={`error-message ${className ? className : ""}`}>{text}</p>
  );
}

ErrorText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
