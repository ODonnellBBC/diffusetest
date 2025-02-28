import * as core from '@diffusionstudio/core';
import React, { useEffect } from 'react';
import { render } from './render';
import { Icon, Play, Pause, SkipForward, SkipBack, Gauge } from 'lucide-react';
import { Composition, VideoClip, VideoSource, TextClip, Font, Keyframe } from '@diffusionstudio/core';

/**
 * Setup the playback controls
 */
// const setupControls = (composition: core.Composition) => {
// // // query the required elements

//   if (!composition) {
//     console.log(composition);
//     return;
//   }

//   console.log('Setting up controls...');
//   const container = document.querySelector('[id="player-container"]') as HTMLDivElement;
//   const player = document.querySelector('[id="player"]') as HTMLDivElement;
//   const time = document.querySelector('[id="time"]') as HTMLSpanElement;
//   const exportButton = document.querySelector('[id="export"]') as HTMLButtonElement;
//   const playButton = document.querySelector('[data-lucide="play"]') as HTMLElement;
//   const pauseButton = document.querySelector('[data-lucide="pause"]') as HTMLElement;
//   const backButton = document.querySelector('[data-lucide="skip-back"]') as HTMLElement;
//   const forwardButton = document.querySelector('[data-lucide="skip-forward"]') as HTMLElement;

//   const handlePlay = () => composition.play();
//   const handlePause = () => composition.pause();
//   const handleBack = () => composition.seek(0);
//   const handleForward = () => composition.seek(composition.duration.frames);
//   const handleExport = () => render(composition);

//   playButton.addEventListener('click', handlePlay);
//   pauseButton.addEventListener('click', handlePause);
//   backButton.addEventListener('click', handleBack);
//   forwardButton.addEventListener('click', handleForward);
//   exportButton.addEventListener('click', handleExport);

//   composition.on('play', () => {
//     playButton.style.display = 'none';
//     pauseButton.style.display = 'block';
//   });
//   composition.on('pause', () => {
//     pauseButton.style.display = 'none';
//     playButton.style.display = 'block';
//   });
//   composition.on('currentframe', () => {
//     time.textContent = composition.time();
//   });

//   // add canvas to dom
//   composition.attachPlayer(player);

//   // handle window resizes
//   const observer = new ResizeObserver(() => {
//     const scale = Math.min(
//       container.clientWidth / composition.width,
//       container.clientHeight / composition.height
//     );

//     player.style.width = `${composition.width}px`;
//     player.style.height = `${composition.height}px`;
//     player.style.transform = `scale(${scale})`;
//     player.style.transformOrigin = 'center';
//   });

//   observer.observe(document.body);
//   time.textContent = composition.time();

//   return (
//     <>
//     </>
//   )
// };

interface ControlProps {
  composition: core.Composition
  clip: core.VideoClip
}

const Controls: React.FC<ControlProps> = ({
  composition,
  clip,
}) => {

  const containerRef = React.createRef();
  const playerRef = React.createRef();
  const boldFont = Font.fromFamily({ family: 'The Bold Font', weight: '500' });
  const captionTextClip = new TextClip({
    text: '',
    position: 'center',
    font: boldFont,
    rotation: new Keyframe(
      [0, 15],
      [243, 360 * 2]
    ),
    translate: {
      x: new Keyframe(
        [clip.duration.frames - 10, clip.duration.frames],
        [0, -2000],
        { easing: 'easeIn' }
      ),
      y: 0,
    },
    scale: new Keyframe([0, 10], [0.3, 1]),
    fontSize: 34
  })
  composition.add(captionTextClip);

  useEffect(() => {
    setTimeout(() => {
      if (composition) {
        console.log(composition, playerRef);
        composition.attachPlayer(playerRef.current);

        // handle window resizes
        const scale = Math.min(
          containerRef.current.clientWidth / composition.width,
          containerRef.current.clientHeight / composition.height
        );
    
        playerRef.current.style.width = `${composition.width}px`;
        playerRef.current.style.height = `${composition.height}px`;
        playerRef.current.style.transform = `scale(${1.0})`;
        playerRef.current.style.transformOrigin = 'center';
      
        //observer.observe(document.body);
        playerRef.current.style.width = `${composition.width}px`;
        playerRef.current.style.height = `${composition.height}px`;
        playerRef.current.style.transform = `scale(${scale})`;
        playerRef.current.style.transformOrigin = 'center';
      }
      else {
        console.log('missing composition');
      }
    }, 500);
  }, );

  // composition.on('play', () => {
  //   playButton.style.display = 'none';
  //   pauseButton.style.display = 'block';
  // });
  // composition.on('pause', () => {
  //   pauseButton.style.display = 'none';
  //   playButton.style.display = 'block';
  // });
  // composition.on('currentframe', () => {
  //   time.textContent = composition.time();
  // });

  const updateCaption = (text: string) => {
    console.log(text);
    captionTextClip.text = text;
  }

  const handleExport = () => {
    render(composition);
  }

  return (
    <>
      <div className="interface">
        <div className="player-container" id="player-container" ref={containerRef}>
          <div id="player" ref={playerRef}></div>
          {/* <div id="progress">
            <h1>0%</h1>
          </div> */}
        </div>
        <div className="controls">
          <label>
            Caption Text: <input name="caption-input" onInput={(event) => updateCaption(event.target.value)} />
          </label>
          <div className="playback" id="playback">
            <SkipBack onClick={() => composition.seek(0)}></SkipBack>
            <Play onClick={() => composition.play()}></Play>
            <Pause onClick={() => composition.pause()}></Pause>
            <SkipForward onClick={() => composition.seek(composition.duration.frames)}></SkipForward>
          </div>
          <span id="time">{`${composition.time()}`}</span>
            <Gauge></Gauge>
          <button id="export" type="button" onClick={() => handleExport()}>
            {/* <div className="loader"></div> */}
            Export
          </button>
        </div>
      </div>
    </>
  );
}

export default Controls;
