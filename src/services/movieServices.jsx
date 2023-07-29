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
  deleteMovies: (MaPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`);
  },
  updateMovies: (data) => {
    return https.post("/api/QuanLyPhim/CapNhatPhimUpload", data);
  }
}