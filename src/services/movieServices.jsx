import { https } from "./config"

export const movieServ = {
  getAllBanners: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovies: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  addMovies: (formData) => {
    return https.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  getMovieDetails: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  deleteMovies: (MaPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`);
  },
  updateMovies: (formData) => {
    return https.post("/api/QuanLyPhim/CapNhatPhimUpload", formData);
  }
}