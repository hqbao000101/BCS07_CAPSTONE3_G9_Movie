import React, { useEffect } from "react";
import TableMovie from "../../Components/TableMovie/TableMovie";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../redux/slices/movieSlice";

const MovieManagement = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium uppercase">
        <span className="text-blue-500">Movie </span>
        Management
      </h1>
      <TableMovie />
    </>
  );
};

export default MovieManagement;
