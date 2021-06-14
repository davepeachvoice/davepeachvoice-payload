import React, { useEffect } from "react";
import Canvas from "./Canvas";
import { List } from "immutable";

// https://github.com/anonymousthing/audio-visualizer/blob/master/visualizer.js
export default function AudioVisualizer(props) {
  const [audioContext, setAudioContext] = React.useState(null);
  const [audioAnalyserNode, setAudioAnalyserNode] = React.useState(null);
  const [
    audioVisualizerInitialized,
    setAudioVisualizerInitialized,
  ] = React.useState(false);
  const [songText, setSongText] = React.useState("");
  const [textSize, setTextSize] = React.useState("10px");
  const [multiplier, setMultiplier] = React.useState(null);
  const [finalBins, setFinalBins] = React.useState(null);
  const [logLookupTable, setLogLookupTable] = React.useState(null);
  const [binWidth, setBinWidth] = React.useState(null);
  const [drawing, setDrawing] = React.useState(false);
  const [canvasHeight, setCanvasHeight] = React.useState(null);
  const [canvasWidth, setCanvasWidth] = React.useState(null);
  const [logBinLengths, setLogBinLengths] = React.useState(null);

  // Configurable variables
  //Note: bins needs to be a power of 2
  const displayBins = 512;
  const backgroundColour = "#2C2E3B";
  const barColour = "#EC1A55";
  // const songFont = "15px 'Open Sans'";
  //Where the bottom of the waveform is rendered at (out of 255). I recommend
  //leaving it at 96 since it seems to work well, basically any volume will push
  //it past 96. If your audio stream is quiet though, you'll want to reduce this.
  const floorLevel = 96;

  //Whether to draw the frequencies directly, or scale the x-axis logarithmically and show pitch instead.
  const drawPitch = true;
  //Whether to draw the visualisation as a curve instead of discrete bars
  const drawCurved = true;
  //If drawCurved is enabled, this flag fills the area beneath the curve (the same colour as the line)
  const drawFilled = false;
  //Whether to draw text the songText on top of the visualisation
  const drawText = false;

  const magicConstant = 42; //Meaning of everything. I don't know why this works.

  // set up audioContext
  useEffect(() => {
    setAudioContext(
      new window.AudioContext() || new window.webkitAudioContext()
    );
  }, [props.playing]);

  // wait for audioContext to be available
  useEffect(() => {
    function createLookupTable(bins, lookupTable) {
      const binLengths = [];
      if (drawPitch) {
        let lastFrequency = magicConstant / multiplier;
        let currentLength = 0;
        let lastBinIndex = 0;
        for (let i = 0; i < displayBins; i++) {
          const thisFreq = lastFrequency * multiplier;
          lastFrequency = thisFreq;
          const binIndex = Math.floor((bins * thisFreq) / 22050);
          lookupTable[i] = binIndex;
          currentLength++;

          if (binIndex != lastBinIndex) {
            for (let j = 0; j < currentLength; j++)
              binLengths.push(currentLength);
            currentLength = 0;
          }

          lastBinIndex = binIndex;
        }
      } else {
        for (let i = 0; i < displayBins; i++) {
          lookupTable[i] = i;
        }
      }
      console.log("binLengths");
      console.log(binLengths);
      return binLengths;
    }

    function setupAudioApi(audioElement) {
      console.log("Setting up audio api");
      const src = audioContext.createMediaElementSource(audioElement);
      const localAudioAnalyserNode = audioContext.createAnalyser();
      src.connect(localAudioAnalyserNode);
      localAudioAnalyserNode.connect(audioContext.destination);

      //FFT node takes in 2 samples per bin, and we internally use 2 samples per bin
      localAudioAnalyserNode.fftSize = drawPitch
        ? displayBins * 8
        : displayBins * 2;
      setMultiplier(
        Math.pow(22050, 1 / displayBins) *
          Math.pow(1 / magicConstant, 1 / displayBins)
      );
      setLogBinLengths(List());
      const localFinalBins = [];
      const localLogLookupTable = [];
      for (let i = 0; i < displayBins; i++) {
        localFinalBins.push(0);
        localLogLookupTable.push(0);
      }
      setFinalBins(List(localFinalBins));
      setLogBinLengths(
        List(
          createLookupTable(
            localAudioAnalyserNode.frequencyBinCount,
            localLogLookupTable
          )
        )
      );
      setLogLookupTable(localLogLookupTable);
      setBinWidth(Math.ceil(canvasWidth / (displayBins - 1)));

      setAudioAnalyserNode(localAudioAnalyserNode);

      setAudioVisualizerInitialized(true);
    }

    function initializeVisualizer(audioElement) {
      try {
        console.log("audiocontext");
        console.log(audioContext);
        setupAudioApi(audioElement); // STARTHERE: make canvasWidth available to this function (must get get this from canvas somehow)
      } catch (e) {
        console.log(e);
      }
    }

    const play = () => {
      console.log("playing");
      initializeVisualizer(props.audio);

      // tell Canvas to start drawing
      setDrawing(true);
    };

    console.log("used effect");
    if (props.playing) play();
    else stop();
  }, [
    audioContext,
    props.playing,
    props.audio,
    canvasWidth,
    drawPitch,
    multiplier,
  ]);

  const handleContextAvailable = (localCtx) => {
    setCanvasWidth(localCtx.canvas.width);
    setCanvasHeight(localCtx.canvas.height);
  };

  const stop = () => {
    console.log("stopping");
    setDrawing(false);
  };

  const draw = (localCtx) => {
    console.log("drawing");

    if (!audioVisualizerInitialized) return;

    localCtx.strokeStyle = barColour;
    localCtx.fillStyle = backgroundColour;
    localCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    const bins = audioAnalyserNode.frequencyBinCount;
    const data = new Uint8Array(bins);
    audioAnalyserNode.getByteFrequencyData(data);
    localCtx.fillStyle = barColour;
    console.log(barColour);

    if (drawPitch) updateBinsLog(logLookupTable, data);
    else updateBins(bins, logBinLengths);

    if (!drawCurved) {
      for (let i = 0; i < displayBins; i++) {
        paintSingleBin(i, localCtx);
      }
    } else {
      localCtx.fillStyle = barColour;
      localCtx.beginPath();
      localCtx.moveTo(0, canvasHeight - getBinHeight(0));
      console.log(canvasHeight);
      console.log(getBinHeight(0));
      let i;
      for (i = 0; i < displayBins - 2; ) {
        const thisX = i * binWidth;
        const nextX = (i + logBinLengths[i]) * binWidth; //First subbin of the next bin
        const x = (thisX + nextX) / 2;

        const thisY = canvasHeight - getBinHeight(i);
        const nextY = canvasHeight - getBinHeight(i + logBinLengths[i]);
        const y = (thisY + nextY) / 2;

        localCtx.quadraticCurveTo(thisX, thisY, x, y);

        i += logBinLengths[i];
      }
      localCtx.quadraticCurveTo(
        i * binWidth,
        canvasHeight - getBinHeight(i),
        (i + 1) * binWidth,
        canvasHeight - getBinHeight(i + 1)
      );
      if (drawFilled) {
        localCtx.lineTo(canvasWidth, canvasHeight);
        localCtx.lineTo(0, canvasHeight);
        localCtx.fill();
      } else {
        localCtx.stroke();
      }
    }

    if (drawText) {
      localCtx.fillStyle = "white";
      //Note: the 15's here need to be changed if you change the font size
      const localSongText = "";
      localCtx.fillText(
        songText,
        canvasWidth / 2 - parseInt(textSize, 10) / 2,
        canvasHeight / 2 - 15 / 2 + 15
      );
      setSongText(localSongText);
      setTextSize(localCtx.measureText());
    }
  };

  //Inclusive lower, exclusive upper except with stop == start
  function averageRegion(data, start, stop) {
    if (stop <= start) return data[start];

    let sum = 0;
    for (let i = start; i < stop; i++) {
      sum += data[i];
    }
    return sum / (stop - start);
  }

  function updateBins(bins, data) {
    const step = bins / displayBins;
    for (let i = 0; i < displayBins; i++) {
      const lower = i * step;
      const upper = (i + 1) * step - 1;
      const binValue = averageRegion(data, lower, upper);
      setLogBinLengths([...logBinLengths, 1]);
      setFinalBins(finalBins.set(i, binValue));
    }
  }

  function updateBinsLog(lookupTable, data) {
    for (let i = 0; i < displayBins; i++) {
      setFinalBins(finalBins.set(i, data[lookupTable[i]]));
    }
  }

  function getBinHeight(i) {
    const binValue = finalBins[i];
    console.log("getBinHeight finalBins");
    console.log(finalBins);
    console.log("binValue");
    console.log(binValue);

    //Pretty much any volume will push it over [floorLevel] so we set that as the bottom threshold
    //I suspect I should be doing a logarithmic space for the volume as well
    let height = Math.max(0, binValue - floorLevel);
    //Scale to the height of the bar
    //Since we change the base level in the previous operations, 256 should be changed to 160 (i think) if we want it to go all the way to the top
    height = (height / (256 - floorLevel)) * canvasHeight * 0.8;
    console.log("canvasHeight");
    console.log(canvasHeight);
    console.log("floorLevel");
    console.log(floorLevel);
    return height;
  }

  function paintSingleBin(i, localCtx) {
    const height = getBinHeight(i);
    localCtx.fillRect(i * binWidth, canvasHeight - height, binWidth, height);
  }

  return (
    <>
      <Canvas
        draw={draw}
        opacity={0.2}
        drawing={drawing}
        onContextAvailable={(localCtx) => handleContextAvailable(localCtx)}
      />
    </>
  );
}
