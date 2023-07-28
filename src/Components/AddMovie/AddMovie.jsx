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
      <div className="flex items-center">
      <div className="w-1/2">
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
        <div className="w-1/2">
          <FormAddMovie />
        </div>
        
      </div>
    </div>
  );
};

export default AddMovie;
