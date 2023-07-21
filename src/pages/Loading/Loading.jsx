import React from "react";
import Lottie from "react-lottie";
import * as animationLoading from "../../assets/animation/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="fixed flex items-center w-full h-full bg-white"
      style={{ zIndex: "9999" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
