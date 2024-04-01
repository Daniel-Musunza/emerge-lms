import React, { Fragment, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postProgress } from 'components/dashboard/features/courseModules/courseModuleSlice';

const GKYouTube = (props) => {

  const dispatch = useDispatch();
  const [length, setLength] = useState('');
  const [totalWatchedTime, setTotalWatchedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prevVideoId, setPrevVideoId] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const newVideoId = props.videoId;

  useEffect(() => {
    const resetWatchedTime = () => {
      setTotalWatchedTime(0);
    };

    if (newVideoId !== prevVideoId) {
      resetWatchedTime();
      setPrevVideoId(newVideoId);
    }
  }, [newVideoId, prevVideoId]);

  useEffect(() => {
    const dispatchProgress = async () => {
      if (!props.progressData.courseSectionId || !props.progressData.courseSubSectionId) {
        // If required data is missing, exit early to prevent dispatching
        return;
      }
  
      const requestBody = {
        completedPdf: props.progressData.pdfread,
        courseId: props.progressData.courseId,
        courseSectionId: props.progressData.courseSectionId,
        courseSubSectionId: props.progressData.courseSubSectionId,
        studentId: props.progressData.studentId,
        videoViewedTime: totalWatchedTime
      };

      console.log(requestBody);

      try {
        await dispatch(postProgress(requestBody));
      } catch (error) {
        console.error('Error dispatching progress:', error);
      }
    };
 
    dispatchProgress();
  }, [totalWatchedTime, props.progressData]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0 // You can add more player parameters as needed
    }
  };

  const onReady = (event) => {
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    if (event.data === 1) { // If the player is playing
      setLength(event.target.getDuration());
      setIsPlaying(true);
    } else if (event.data === 2) { // If the player is paused
      setIsPaused(true);
    } else {
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setTotalWatchedTime(prevTotalWatchedTime => prevTotalWatchedTime + 1); // Increment total watched time by 1 second
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  return (
    <Fragment>
      {props.videoId === "" ? (
        <div className="position-absolute text-error" style={{width: '100%', height:'100%', }}><h3 style={{display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: '9999'}}>No Video. please select content</h3></div>
      ): (
        <YouTube
        videoId={props.videoId}
        opts={opts}
        id="player"
        className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
        onReady={onReady}
        onStateChange={onStateChange}
      />
      )}
     
      <div className="position-absolute end-0 top-0 p-2 text-success">
        <p>Video Progress: {totalWatchedTime} / {length}</p>
      </div>
    </Fragment>
  );
};

export default GKYouTube;
