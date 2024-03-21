import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import YouTube from 'react-youtube';

const GKYouTube = (props) => {
    const [videoLength, setVideoLength] = useState(0);

    useEffect(() => {
        // Function to fetch video information using YouTube Data API
        const fetchVideoInfo = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/videos?id=${props.videoId}&key=AIzaSyAZ-cjikP4Pcx-v0-82qD-OTZFzBTti6D4&part=contentDetails`,
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                );
                const duration = response.data.items[0].contentDetails.duration;
                // Parse duration to get video length in seconds
                const videoLengthInSeconds = parseDuration(duration);
                setVideoLength(videoLengthInSeconds);

                console.log(`Video Length: ${videoLength} seconds`);

            } catch (error) {
                console.error('Error fetching video information:', error);
            }
        };

        fetchVideoInfo();

    }, [props.videoId]);

    // Function to parse YouTube video duration format (ISO 8601) to seconds
    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        const hours = (parseInt(match[1]) || 0);
        const minutes = (parseInt(match[2]) || 0);
        const seconds = (parseInt(match[3]) || 0);

        return hours * 3600 + minutes * 60 + seconds;
    };

    const opts = {
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    };

    return (
        <Fragment>
            <YouTube
                videoId={props.videoId}
                opts={opts}
                className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
                iframeClassName="h-100"
            />
            <div className="position-absolute end-0 bottom-0 p-2 text-success">
                <p>Video Length: {videoLength} seconds</p>
            </div>
        </Fragment>

    );
};

export default GKYouTube;
