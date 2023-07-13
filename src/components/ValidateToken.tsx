import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../storage";

export default function ValidateToken({route}: {route: string}) {
    const token = getItem('token');
    return token ? <Outlet/> : <Navigate to={route}/>
}