// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import { useRef, useEffect, useState } from "react";

const useCanvas = (draw, options = {}, drawing, onContextAvailable) => {
  const [animationFrameId, setAnimationFrameId] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("using canvas effect");
    const canvas = canvasRef.current;
    const context = canvas.getContext(options?.context ?? "2d");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    onContextAvailable(context);
    if (!drawing) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      window.cancelAnimationFrame(animationFrameId);
      return;
    }
    let frameCount = 0;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      const localAnimationFrameId = requestAnimationFrame(render);
      setAnimationFrameId(localAnimationFrameId);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawing]);
  return canvasRef;
};
export default useCanvas;
