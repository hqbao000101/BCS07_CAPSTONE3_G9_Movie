import { https } from "./config"

export const movieServ = {
  getAllBanners: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovies: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },
}