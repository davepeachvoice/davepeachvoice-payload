import React from "react";
import PropTypes from "prop-types";

export default function Svg(props) {
  const Element = props.el;

  return (
    <Element
      style={{
        display: "block",
        svg: {
          display: "block",
          width: "100%",
          height: "auto",
        },
      }}
      dangerouslySetInnerHTML={{ __html: props.svg }}
    />
  );
}

Svg.propTypes = {
  className: PropTypes.string,
  el: PropTypes.string.isRequired,
  style: PropTypes.object,
  svg: PropTypes.string.isRequired,
};

Svg.defaultProps = {
  el: "span",
};
