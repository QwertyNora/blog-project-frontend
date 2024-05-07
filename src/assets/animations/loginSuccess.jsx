import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./loginSuccessAnimation.json";

const LoginSuccessAnimation = () => {
  const [animationKey, setAnimationKey] = useState(0); // Key to re-render the animation

  const defaultOptions = {
    loop: false, // We'll manage looping manually with restarts
    autoplay: true, // Start playing automatically upon rendering
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    speed: 0.5, // Play at half speed
  };

  // Restart the animation every time it completes with a delay
  const restartAnimation = () => {
    setTimeout(() => {
      setAnimationKey((prevKey) => prevKey + 1); // Increment key to re-render and restart animation
    }, 2000); // 2 seconds delay before restarting
  };

  useEffect(() => {
    restartAnimation(); // Call restart when component mounts
    // Since this useEffect has no dependencies, it only sets up the initial restart
  }, []);

  return (
    <div>
      <Lottie
        key={animationKey} // Apply key to force re-render
        options={defaultOptions}
        height={200} // Adjusted size as per previous discussion
        width={200} // Adjusted size
        eventListeners={[
          {
            eventName: "complete",
            callback: () => restartAnimation(), // Restart animation after it completes
          },
        ]}
      />
    </div>
  );
};

export default LoginSuccessAnimation;
