import React from "react";
import TableMovie from "../../Components/TableMovie/TableMovie";

const MovieManagement = () => {
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
