import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoute } from "../components/private-route/PrivateRoute";
import HomePage from "../pages/Home";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Box from '@mui/material/Box';
import Servicios from "../pages/Servicios";
import Artistas from "../pages/Artistas";

export default function AppRoutes() {
   const userData = JSON.parse(localStorage.getItem("userData"));
   const token = userData?.token;
   return (
      <Box display="flex" flexDirection="column" minHeight="95vh">
         <Header />
         <Box component="main" flexGrow={1}>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/servicios" element={<Servicios />} />
               <Route path="/artistas" element={<Artistas />} />
               <Route path="/profile" element={<PrivateRoute Page={Register} />} />
               {token && <Route path="/admin" element={<Register />} />}
            </Routes>
         </Box>
         <Footer />
      </Box>
   );
}
