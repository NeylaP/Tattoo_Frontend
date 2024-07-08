import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AppRoutes() {
   return (
      <BrowserRouter>
         <Header />
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         <Footer />
      </BrowserRouter>
   );
}
