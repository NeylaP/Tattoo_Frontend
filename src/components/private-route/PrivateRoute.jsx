import { Navigate } from "react-router-dom"

export function PrivateRoute ({ Page }) {

    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData?.token && userData?.decoded.userRoleName === 'Super Admin';

    return token ? <Page /> : <Navigate to="/login" />
}