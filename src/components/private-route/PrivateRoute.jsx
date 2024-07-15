import { Navigate } from "react-router-dom"

export function PrivateRoute ({ Page }) {

    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = userData?.token

    return token ? <Page /> : <Navigate to="/login" />
}