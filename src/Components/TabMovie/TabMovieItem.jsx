import { Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { theaterServ } from "../../services/theaterServices";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";

const TabMovieItem = ({ maHeThongRap }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    theaterServ
      .getAllMovieSchedules(maHeThongRap)
      .then((res) => {
        setSchedule(res.data.content);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }, [maHeThongRap]);

  const renderTabMovieItem = () => {
    return schedule[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left w-80">
            <p className="font-medium text-green-600 truncate">
              {item.tenCumRap}
            </p>
            <p className="truncate">{item.diaChi}</p>
            <NavLink to="/theater-details">
              <button className="mt-2 font-medium text-orange-300 duration-300 hover:text-red-600">
                [Chi tiết]
              </button>
            </NavLink>
          </div>
        ),
        key: index,
        children: (
          <div className="space-y-5">
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div key={index} className="flex py-5">
                    <div className="w-2/12">
                      <img
                        src={item.hinhAnh}
                        alt=""
                        className="object-cover h-56 border border-black shadow-md"
                      />
                    </div>
                    <div className="w-10/12 px-5">
                      <h3 className="mb-3 text-lg font-bold">{item.tenPhim}</h3>
                      <div className="grid grid-cols-2 gap-5">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <NavLink to="/movie-details" key={index}>
                                <p className="py-2 text-center duration-300 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200">
                                  <span className="mr-2 font-medium text-green-600">
                                    {moment(suatChieu.ngayChieuGioChieu).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </span>
                                  ~
                                  <span className="ml-2 font-medium text-red-500">
                                    {moment(suatChieu.ngayChieuGioChieu).format(
                                      "h:mm"
                                    )}
                                  </span>
                                </p>
                              </NavLink>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
              return "";
            })}
          </div>
        ),
      };
    });
  };

  return (
    <Tabs
      tabPosition={"left"}
      items={renderTabMovieItem()}
      style={{ maxHeight: "500px", overflowY: "scroll" }}
    />
  );
};

export default TabMovieItem;
