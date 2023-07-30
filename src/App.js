import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./templates/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import AdminTemplate from "./templates/AdminTemplate";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import UserManagement from "./pages/UserManagement/UserManagement";
import Booking from "./pages/Booking/Booking";
import MovieManagement from "./pages/MovieManagement/MovieManagement";
import AddMovie from "./Components/AddMovie/AddMovie";
import ShowTime from "./Components/ShowTime/ShowTime";
import EditMovie from "./Components/EditMovie/EditMovie";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          {/* <Route path="user" element={<UserManagement />} /> */}
          <Route index element={<UserManagement />} />
          <Route path="/admin/movie" element={<MovieManagement />} />
          <Route path="/admin/movie/add" element={<AddMovie />} />
          <Route path="/admin/movie/edit/:id" element={<EditMovie />} />
          <Route path="/admin/show-time" element={<ShowTime />} />
        </Route>
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
