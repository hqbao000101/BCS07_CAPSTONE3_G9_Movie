import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import { NavLink } from "react-router-dom";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import {
  set_loading_ended,
  set_loading_started,
} from "../../redux/slices/loadingSlice";

const ListMovie = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(set_loading_started());
    movieServ
      .getAllMovies()
      .then((res) => {
        setMovie(res.data.content);
        dispatch(set_loading_ended());
      })
      .catch((err) => {
        message.error(err.response.data);
        dispatch(set_loading_ended());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-screen-xl py-10 mx-auto">
      <h2 className="text-3xl font-bold mb-7">Danh sách phim</h2>
      <div className="grid grid-cols-4 gap-5">
        {/* Movie Item */}
        {movie.map((item, index) => {
          return (
            <div className="mb-3 movie_item" key={index}>
              <img
                src={item.hinhAnh}
                alt={item.maPhim}
                className="object-cover w-full h-72"
              />
              <div className="text">
                <h3 className="h-12 mt-5 mb-3 text-xl font-bold">
                  <span className="px-2 py-1 mr-3 text-sm text-white bg-orange-600 rounded-md">
                    {item.maNhom}
                  </span>
                  {item.tenPhim}
                </h3>
                <p className="line-clamp-3">{item.moTa}</p>
                <NavLink
                  to={`/detail/${item.maPhim}`}
                  className="inline-block w-full mt-3"
                >
                  <Button type="primary" danger className="w-full h-10 text-lg">
                    Xem Ngay
                  </Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMovie;
