import React from "react";
import Lottie from "react-lottie";
import animationData from "./SuccesAnimation.json"; // Make sure to correct the path to your Lottie JSON file

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // This helps to scale the animation nicely
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default SuccessAnimation;
