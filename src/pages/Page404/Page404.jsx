import React from "react";
import Lottie from "react-lottie";
import * as animation404 from "../../assets/animation/98170-sunthalpy-404.json";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Page404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie options={defaultOptions} height={500} width={700} />
      <NavLink to="/" className="mt-3 ">
        <Button type="primary" danger className="w-full h-10 text-lg">
          Quay về Trang Chủ
        </Button>
      </NavLink>
    </div>
  );
};

export default Page404;
