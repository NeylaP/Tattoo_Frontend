import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/access/login/Login";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AppRoutes() {
   return (
      <BrowserRouter>
         <Header />
            <Routes>
               <Route path="/login" element={<Login />} />
            </Routes>
         <Footer />
      </BrowserRouter>
   );
}
