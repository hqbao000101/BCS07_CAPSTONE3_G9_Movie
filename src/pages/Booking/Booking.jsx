import React, { Component } from "react";
import SeatInfo from "./SeatInfo";
import SeatRow from "./SeatRow";
import "./Style-Booking.css";
import danhSachGheData from "./danhSachGhe.json";

class Booking extends Component {
  renderSeatLayout = () => {
    return danhSachGheData.map((hangGhe, index) => {
      return (
        <div key={index}>
          <SeatRow hangGhe={hangGhe} soHangGhe={index} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="py-12 bg-overlay bg-gradient-to-b from-white to-blue-500">
        <div className="flex w-full justify-evenly">
          <div className="w-3/4 text-center ">
            <h3 className="mt-3 h1"> MOVIE SEAT SELECTION 🍿</h3>
            <p>
              Please select your preferred seats. Prices may vary depending on
              the location of the seats within the theater.
            </p>
            <br />
            <br />
            <h5 className="pt-0">SCREEN LOCATED HERE.</h5>
            <div className="mt-3 screen"></div>
            <div className="mt-2 ml-5 text-left fs-ghe">
              {this.renderSeatLayout()}
            </div>
            <div className="mt-3 text-left ps-12">
              <ul className="mt-5 confirmSeat">
                <li>
                  <button className="gheDuocChon" id="resSeat"></button>
                  <span className="fs-ghe">Reserved Seat</span>
                </li>
                <li>
                  <button className="gheDangChon" id="seleSeat"></button>
                  <span className="fs-ghe">Selected Seat</span>
                </li>
                <li>
                  <button className="ml-0 ghe" id="empSeat"></button>
                  <span className="fs-ghe">Empty Seat</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/4">
            <SeatInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;
