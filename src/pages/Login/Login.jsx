import React from "react";
import Lottie from "react-lottie";
import * as animationLogin from "../../assets/animation/login2.json";
import FormLogin from "../../Components/FormLogin/FormLogin";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center gap-4 px-48">
      <div className="w-1/2">
        <Lottie options={defaultOptions} width={"100%"} />
      </div>
      <div className="w-1/2 px-24">
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
