import React from "react";
import Lottie from "react-lottie";
import * as animationRegister from "../../assets/animation/register.json"; 
import FormRegister from "../../Components/FormRegister/FormRegister";

const Register = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationRegister,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center px-40">
      <div className="w-1/2">
        <Lottie options={defaultOptions} width={"80%"} />
      </div>
      <div className="w-1/2">
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
