import { https } from "./config";

export const userServ = {
  login: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  getAllUsers: () => {
    return https.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
  },
  deleteUsers: (taiKhoan) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
  addUsers: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
};
