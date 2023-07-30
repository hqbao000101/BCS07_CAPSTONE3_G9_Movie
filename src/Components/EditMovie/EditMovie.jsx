import React from "react";
import { useSelector } from "react-redux";
import FormEditMovie from "../FormEditMovie/FormEditMovie";

const EditMovie = () => {
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium uppercase">
        <span className="text-blue-500">Edit </span>
        the Movie
      </h1>
          <FormEditMovie selectedMovie={selectedMovie}/>
      
    </>
  );
};

export default EditMovie;
