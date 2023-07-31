import { message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";

class SeatInfo extends Component {
  handleCheckout = () => {
    message.success("Seat reserved successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, [1000]);
  };

  renderDSGheDangDat = () => {
    return this.props.danhSachGheDangDat.map((gheDangDat, index) => {
      return (
        <tr key={index}>
          <td>{gheDangDat.soGhe}</td>
          <td>{gheDangDat.gia}</td>
          <td>
            <button
              className=""
              onClick={() => {
                this.props.dispatch({
                  type: "CANCEL_SEAT",
                  soGhe: gheDangDat.soGhe,
                });
              }}
            >
              <i className="fa-sharp fa-solid fa-circle-xmark"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <div className="mt-3 text-right pr-5">
          {" "}
          {/* Add the float-right class */}
          <table className="table" border={2}>
            <thead>
              <tr>
                <th>Seat Number</th>
                <th>Price</th>
                <th>Cancel (Y/N)</th>
              </tr>
            </thead>
            <tbody>{this.renderDSGheDangDat()}</tbody>
          </table>
          <button className="special-button mr-7" onClick={this.handleCheckout}>
            Checkout
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    danhSachGheDangDat: state.ThongTinDatVeReducer.danhSachGheDangDat || [],
  };
};

export default connect(mapStateToProps)(SeatInfo);
