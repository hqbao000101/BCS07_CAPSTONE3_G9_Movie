import produce from "immer";

const stateDefault = {
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  thongTinPhim: {},
  danhSachGhe: [],
};

const ThongTinDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "BOOK_SEAT":
      // Use `immer` to create a new immutable state
      return produce(state, (draftState) => {
        let index = draftState.danhSachGheDangDat.findIndex(
          (gheDangDat) => gheDangDat.soGhe === action.ghe.soGhe
        );
        if (index !== -1) {
          draftState.danhSachGheDangDat.splice(index, 1);
        } else {
          draftState.danhSachGheDangDat.push(action.ghe);
        }
      });

    case "CANCEL_SEAT":
      // Use `immer` to create a new immutable state
      return produce(state, (draftState) => {
        let index = draftState.danhSachGheDangDat.findIndex(
          (gheDangDat) => gheDangDat.soGhe === action.soGhe
        );
        if (index !== -1) {
          draftState.danhSachGheDangDat.splice(index, 1);
        }
      });

    default:
      return state;
  }
};

export default ThongTinDatVeReducer;