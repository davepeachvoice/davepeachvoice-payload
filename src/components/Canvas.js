// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React from "react";
import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const {
    draw,
    options,
    opacity,
    drawing,
    onContextAvailable,
    ...rest
  } = props;
  const canvasRef = useCanvas(draw, options, drawing, onContextAvailable);

  return <canvas style={{ opacity: opacity ?? 1 }} ref={canvasRef} {...rest} />;
};

export default Canvas;
