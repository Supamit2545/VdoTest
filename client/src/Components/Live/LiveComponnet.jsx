import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const LiveStream = () => {
    const videoRef = useRef(null);
    const [isLive, setIslive] = useState(true)

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource('http://localhost:8000/live/test/index.m3u8');
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch(error => console.log('Error playing video:', error));
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = 'http://localhost:8000/live/test/index.m3u8';
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play().catch(error => console.log('Error playing video:', error));
            });
        }
    }, []);

    return (
        <div className=''>
            <video className='Video-Live' ref={videoRef} controls autoPlay />
        </div>
    );
};

export default LiveStream;
