/**
 * Deal with Safari programmatic audio play blocking. On the first user interaction, call play() on
 * the MediaElement that AudioWaveform will use. This will "unlock" the MediaElement such that
 * subsequent .play() calls performed by Waveform.js will succeed.
 * https://curtisrobinson.medium.com/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
 */
export function constructUnlockedMediaElement() {
  const localMediaElement = document.createElement('audio');

  // this will fail, so we catch it so that the user doesn't see it in the browser logs
  localMediaElement.play().catch(() => {});
  localMediaElement.pause();
  localMediaElement.currentTime = 0;

  return localMediaElement;
}
