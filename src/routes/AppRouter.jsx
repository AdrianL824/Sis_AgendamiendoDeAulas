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
import Page_Periodo from "../pages/Admin/Periodo/Page";
import Select_Aulas from "../hooks/Components/Select_Aulas";
import Page_ReservaList from "../pages/Admin/PediodoList/PeriodoList";
import PageAnuncios from "../pages/Client/Home/PageAnuncios";
import Page_Reportes from "../pages/Admin/Reports/Page";
import Page_Alumnos from "../pages/Admin/Alumnos/AlumnosPage";

export const AppRouter = () => {
  const authToken = Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route path="/anuncios" element={<PageAnuncios />} />
        <Route
          path="/login"
          element={authToken ? <Navigate to="/admin" /> : <Login />}
        />
        <Route path="/admin/ambiente" element={<Page_Ambiente />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/user" element={<Create_User />} />
        <Route path="/admin/reserva" element={<Page_Reserva />} />
        <Route path="/admin/reservalist" element={<Page_ReservaList />} />
        <Route path="/admin/periodo" element={<Page_Periodo />} />
        <Route path="/admin/select" element={<Select_Aulas />} />
        <Route path="/admin/reportes" element={<Page_Reportes />} />
        <Route path="/admin/materias" element={<Page_Alumnos />} />
      </Routes>
    </Router>
  );
};
