import React, { Fragment, useEffect, useState } from 'react';

const GKYouTube = (props) => {
  
  let newVideoId = props.videoId;
  useEffect(() => {
   console.log(newVideoId);
    // Load the YouTube IFrame Player API asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function called when the YouTube API script is loaded
    window.onYouTubeIframeAPIReady = () => {
      // Initialize the player
      
        // Destroy previous player and cre
          var player = new window.YT.Player('player', {
            height: '390',
            width: '640',
            videoId: newVideoId,
            playerVars: {
              'playsinline': 1
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });

     

      // Function called when the player is ready
      function onPlayerReady(event) {
        event.target.playVideo();
        updateVideoInfo();
      }

      // Function called when the player's state changes
      function onPlayerStateChange(event, done) {
        if (event.data == window.YT.PlayerState.PLAYING && !done) {
          done = true;
        }
        updateVideoInfo();
      }

      // Function to update video progress and length
      function updateVideoInfo() {
        const videoLengthElem = document.getElementById("videoLength");
        const videoProgressElem = document.getElementById("videoProgress");
        if (player && videoProgressElem && videoLengthElem) {
          const videoLength = player.getDuration();
          const videoProgress = player.getCurrentTime();
          videoLengthElem.innerHTML = "Video Length: " + formatTime(videoLength);
          videoProgressElem.innerHTML = "Video Progress: " + formatTime(videoProgress);
        }


      }

      // Function to format time in seconds to 'HH:MM:SS' format
      function formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
      }

      // Function to stop the video
      function stopVideo() {
        player.stopVideo();
      }

      // Cleanup function
      return () => {
        if (player) {
          player.destroy();
        }
      };
    };
  

  }, [newVideoId]); // Execute effect only when videoId changes

  
  
  return (
    <Fragment>
      <div id="player" className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"></div>
      <div className="position-absolute end-0 bottom-0 p-2 text-success">
        <p><div id="videoProgress"></div> <div id="videoLength"></div></p>
      </div>
    </Fragment>
  );
};

export default GKYouTube;
