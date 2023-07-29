import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";

export const getAllMovies = createAsyncThunk(
  "/movie/getAllMovies",
  async () => {
    const res = await movieServ.getAllMovies();
    return res.data.content;
  }
);

const initialState = {
  movies: [],
  selectedMovie: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { setSelectedMovie, setMovies } = movieSlice.actions;
export default movieSlice.reducer;
