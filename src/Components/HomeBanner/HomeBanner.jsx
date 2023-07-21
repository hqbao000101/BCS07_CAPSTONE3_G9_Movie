import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { movieServ } from "../../services/movieServices";

// const contentStyle = {
//   margin: 0,
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

const HomeBanner = () => {
  const [banner, setBanner] = useState([]);
  const getAllBanner = async () => {
    const res = await movieServ.getAllBanners();
    setBanner(res.data.content);
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <Carousel autoplay>
      {banner.map((item, index) => {
        return (
          <div key={index} className="h-93vh">
            <img className="object-cover w-full h-full" src={item.hinhAnh} alt="" />
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeBanner;
