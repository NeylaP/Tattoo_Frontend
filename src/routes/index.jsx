import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/access/Login";
import Register from "../components/access/Register";
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
