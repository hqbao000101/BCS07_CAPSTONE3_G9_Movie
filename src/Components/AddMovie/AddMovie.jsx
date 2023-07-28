import React from "react";
import FormAddMovie from "../FormAddMovie/FormAddMovie";
import Lottie from "react-lottie";
import * as animationAddMovie from "../../assets/animation/add_movie.json";

const AddMovie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationAddMovie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium uppercase">
        <span className="text-blue-500">Add </span>
        New Movies
      </h1>
      <div className="flex items-start flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full">
          <Lottie options={defaultOptions} height={"80%"} width={"80%"} />
        </div>
        <div className="lg:w-1/2 w-full">
          <FormAddMovie />
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
