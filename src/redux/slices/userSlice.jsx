import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../../utils/localStore";
import { userServ } from "../../services/userServices";

// ! nơi tạo ra các createAsynThunk để xử lý bất đồng bộ trước khi bắn dữ liệu lên store bằng redux-thunk
// ! bên trong createAsyncThunk sẽ có 2 tham số, một là type của hàm, hai là hàm cần xư lý bất đồng bộ
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  const res = await userServ.getAllUsers();
  // ! return sẽ trả về giá trị bắn lên store
  return res.data.content;
});

const initialState = {
  userData: getLocal("user"),
  users: [],
};

// ! immerjs library --> auto handle the immutation in js
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // ! check xem userData is empty or not
      if (state.userData === "") {
        state.userData = action.payload;
      }
    },
  },
  // ! extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lý bất đồng bộ có nhiều trường hợp xảy ra
  extraReducers: (builder) => {
    // ! khi xử lý thì bên trong hàm sẽ có 3 phương thức tương ứng với các trường hợp chạy thành công, đang chạy, thất bại
    // * fulfilled: thành công
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // * pending: đang chạy
    // * rejected: thất bại
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.users = [
        {
          hoTen: "bao",
          maLoaiNguoiDung: "QuanTri",
        },
      ];
    });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
