import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import loadingSlice from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    project: (state = "react-movie-project", action) => {
      return state;
    },
    startDay: (state = "Friday, July 7th, 2023", action) => {
      return state;
    },
    user: userSlice,
    loading: loadingSlice,
  },
});
