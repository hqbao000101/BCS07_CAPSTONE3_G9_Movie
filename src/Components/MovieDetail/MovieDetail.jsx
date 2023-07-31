import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieServ } from "../../services/movieServices";
import moment from "moment";
import TabMovie from "../TabMovie/TabMovie";
import { getLocal } from "../../utils/localStore";
import { Modal } from "antd";

const MovieDetail = () => {
  const { id } = useParams("id");
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);

  const getMovieDetails = async (id) => {
    const currentMovie = await movieServ.getMovieDetails(id);
    setMovie(currentMovie.data.content);
  };
  useEffect(() => {
    getMovieDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    tenPhim,
    hinhAnh,
    ngayKhoiChieu,
    moTa,
    dangChieu,
    sapChieu,
    hot,
    danhGia,
  } = movie;
  return (
    <>
      <div className="py-12 text-white bg-gradient-to-b from-black to-blue-500">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="mb-10 text-4xl uppercase">
            Movie <span className="font-semibold text-blue-500">Detail</span>
          </h1>
          <div className="flex">
            <div className="w-1/2">
              <img src={hinhAnh} alt="Movie" className="object-cover w-[90%]" />
            </div>
            <div className="flex flex-col w-1/2 gap-5 text-xl pe-4">
              <h2 className="text-3xl font-bold uppercase">{tenPhim}</h2>
              <div>
                <span className="text-blue-500">Premiere: </span>
                <span>{moment(ngayKhoiChieu).format("DD/MM/YYYY")}</span>
              </div>
              <div>
                <span className="text-blue-500">Detail: </span>
                <span>{moTa}</span>
              </div>
              <div>
                <span className="text-blue-500">Status: </span>
                <span>
                  {dangChieu ? "Showing Now | " : ""}
                  {sapChieu ? "Coming Soon | " : ""}
                  {hot ? "Hot" : ""}
                </span>
              </div>
              <div className="me-1">
                <span className="text-blue-500">Rating: </span>
                <span>{danhGia} / 10</span>
              </div>
              <div className="mt-12">
                <button
                  className="px-5 py-3 duration-500 bg-blue-500 rounded-lg hover:bg-green-600 me-5"
                  onClick={() => {
                    setModal2Open(true);
                  }}
                >
                  Watch Trailer
                </button>
                <button
                  className="px-5 py-3 duration-500 bg-blue-500 rounded-lg hover:bg-green-600"
                  onClick={() => {
                    getLocal("user")
                      ? navigate("/booking")
                      : navigate("/login");
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-24 pb-14">
        <TabMovie />
      </div>
      <Modal
        title="Movie Trailer"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        cancelText="Ok"
        okText="Close"
        okType="danger"
        width={"90vw"}
      >
        <iframe
          width="100%"
          height={696}
          src="https://www.youtube.com/embed/1ovgxN2VWNc?autoplay=1"
          title="Train to Busan Official Trailer 1 (2016) - Yoo Gong Movie"
          frameBorder={0}
          allow="accelerometer; clipboard-write; autoplay; encrypted-media; gyroscope; web-share"
          allowFullScreen
        />
      </Modal>
    </>
  );
};

export default MovieDetail;
