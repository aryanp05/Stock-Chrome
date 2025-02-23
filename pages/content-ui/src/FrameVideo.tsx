import React, { useState, useEffect } from 'react';

type FrameVideoProps = {
  frames: string[];        // Array of image URLs
  frameDuration?: number;  // Duration for each frame in ms (default: 100)
  loop?: boolean;          // Whether to loop the frames (default: true)
  width?: string | number; // Width of the container (default: '100%')
  height?: string | number;// Height of the container (default: 'auto')
};

const FrameVideo: React.FC<FrameVideoProps> = ({
  frames,
  frameDuration = 100,
  loop = true,
  width = '100%',
  height = 'auto',
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!frames.length) return;

    const timer = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        return next >= frames.length ? (loop ? 0 : prev) : next;
      });
    }, frameDuration);

    return () => clearInterval(timer);
  }, [frames, frameDuration, loop]);

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <img
        src={frames[currentFrame]}
        alt={`Frame ${currentFrame}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default FrameVideo;
