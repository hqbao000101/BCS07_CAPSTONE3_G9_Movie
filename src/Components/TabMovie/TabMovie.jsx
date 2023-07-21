import { Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { theaterServ } from "../../services/theaterServices";
import TabMovieItem from "./TabMovieItem";

const TabMovie = () => {
  const [theater, setTheater] = useState([]);

  useEffect(() => {
    theaterServ
      .getAllTheaters()
      .then((res) => {
        setTheater(res.data.content);
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  }, []);

  const renderItemTab = () => {
    return theater.map((item, index) => {
      return {
        label: <img src={item.logo} alt="" className="w-12 h-12" />,
        key: index + 1,
        children: <TabMovieItem  maHeThongRap={item.maHeThongRap}/>,
      };
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-7">Hệ thống rạp phim</h2>
      <div className="border">
        <Tabs tabPosition={"left"} items={renderItemTab()} />
      </div>
    </div>
  );
};

export default TabMovie;
