import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./templates/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import AdminTemplate from "./templates/AdminTemplate";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import UserManagement from "./pages/UserManagement/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          {/* <Route path="user" element={<UserManagement />} /> */}
          <Route index element={<UserManagement />} />
        </Route>
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
