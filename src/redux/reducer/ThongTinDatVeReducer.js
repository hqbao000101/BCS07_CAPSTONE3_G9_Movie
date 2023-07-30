<<<<<<< HEAD

const stateDefault = {
    danhSachGheDangDat: [

    ]
}

const ThongTinDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "BOOK_SEAT": {
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.ghe.soGhe);
            if (index !== -1) {
                danhSachGheDangDatUpdate.splice(index, 1);
            } else {
                danhSachGheDangDatUpdate.push(action.ghe);
            }
            state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        }
        case "CANCEL_SEAT": {
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatUpdate.findIndex(gheDangDat => gheDangDat.soGhe === action.soGhe);
            if (index !== -1) {
                danhSachGheDangDatUpdate.splice(index, 1);
            }
            state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        }
        default:
            return { ...state };
    }




}

=======
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
>>>>>>> 61c3578 (fix everything, finish exercise)

export default ThongTinDatVeReducer;