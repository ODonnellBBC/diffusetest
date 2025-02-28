//import * as core from '@diffusionstudio/core';
import Controls from './controls';
import React from 'react';
//import { setupTimeline } from './timeline';
import { composition, clip } from './compositions/example';

// async function RenderVod() {
//   const source = await core.VideoSource // convenience function for fetch -> blob -> file
//   .from('https://diffusion-studio-public.s3.eu-central-1.amazonaws.com/videos/big_buck_bunny_1080p_30fps.mp4');

//   // create a video clip and trim it
//   const video = new core.VideoClip(source) // compatible with the File API
//     .subclip(0, 160); // The base unit is frames at 30 FPS

//   // create a text clip and add styles
//   const text = new core.TextClip({ 
//     text: 'Bunny - Our Brave Hero', 
//     position: 'center', 
//     stop: 80, 
//     stroke: { color: '#000000' } 
//   });

//   const composition = new core.Composition(); // 1920x1080

//   // this is how to compose your clips
//   await composition.add(video);  // convenience function for 
//   await composition.add(text);   // clip -> track -> composition

//   // render video using webcodecs at 25 FPS
//   // use resolution: 2 to render at 4k 
//   return new core.Encoder(composition, { fps: 25 }).render();

//   //<button onClick={() => RenderVod()}>Render</button>
// }

function DiffuseCore() {
  return (
    <>
      <div>
        <Controls composition={composition} clip={clip}/> 
      </div>


      {/* <div id="app">
        <div id="player-container">
          <div id="player"></div>
          <div id="progress">
            <h1>0%</h1>
          </div>
        </div>
        <div id="timeline">
          <div></div>
        </div>
        <div id="controls">
          <div id="playback">
            <i data-lucide="skip-back"></i>
            <i data-lucide="play"></i>
            <i data-lucide="pause"></i>
            <i data-lucide="skip-forward"></i>
          </div>
          <span id="time">00:00 / 00:00</span>
          <i data-lucide="gauge"></i>
          <button id="export" type="button">
            <div class="loader"></div>
            Export
          </button>
        </div>
      </div>
      <script type="module" src="src/index.ts"></script>
      <script src="https://unpkg.com/lucide@latest"></script>
      <script>
        lucide.createIcons();
      </script> */}
    </>
  )
}

export default DiffuseCore;
