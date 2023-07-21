import { https } from "./config";

export const theaterServ = {
  getAllTheaters: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getAllMovieSchedules: (maHeThongRap) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP09`
    );
  },
};
