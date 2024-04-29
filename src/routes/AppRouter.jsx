import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeClient from "../pages/Client/Home/Home";

import HomeAdmin from "../pages/Admin/Home/Page";

import Login from "../auth/Login";
import Cookies from "js-cookie";
import Create_User from "../pages/Admin/User/Page";
import Page_Ambiente from "../pages/Admin/Ambiente/Page";
import Page_Reserva from "../pages/Admin/Reserva/Page";
export const AppRouter = () => {
  const authToken = Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route
          path="/login"
          element={authToken ? <Navigate to="/admin" /> : <Login />}
        />
        <Route path="/admin/ambiente" element={<Page_Ambiente />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/user" element={<Create_User />} />
        <Route path="/admin/reserva" element={<Page_Reserva />} />
      </Routes>
    </Router>
  );
};
