// MIT License

// Copyright (c) 2019 strengthmate

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useRef }  from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles/VisualDemo.module.scss'

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: '25%'
  }
}));

export default function VisualDemo(props) {

    const classes = useStyles();

    const amplitudeValues = useRef(null);

    function adjustFreqBandStyle(newAmplitudeData){
      amplitudeValues.current = newAmplitudeData;
      let domElements = props.frequencyBandArray.map((num) =>
        document.getElementById(num))
      for(let i=0; i<props.frequencyBandArray.length; i++){
        let num = props.frequencyBandArray[i]
        domElements[num].style.backgroundColor = `rgb(0, 255, ${amplitudeValues.current[num]})`
        domElements[num].style.height = `${amplitudeValues.current[num]}px`
      }
    };

    function runSpectrum(){
      props.getFrequencyData(adjustFreqBandStyle)
      requestAnimationFrame(runSpectrum)
    }

    function handleStartBottonClick(){
      props.initializeAudioAnalyser()
      requestAnimationFrame(runSpectrum)
    }

    return (

      <div>

        <div>
          <Tooltip
            title="Start"
            aria-label="Start"
            placement="right">
            <IconButton
              id='startButton'
              onClick={() => handleStartBottonClick()}
              disabled={!!props.audioData ? true : false}>
              <EqualizerIcon/>
            </IconButton>
          </Tooltip>
        </div>

        <div className={classes.flexContainer}>
          {props.frequencyBandArray.map((num) =>
            <Paper
              className={styles.frequencyBands}
              elevation={4}
              id={num}
              key={num}
            />
          )}
        </div>

      </div>

    );

}