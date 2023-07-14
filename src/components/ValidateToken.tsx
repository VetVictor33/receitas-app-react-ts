import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../storage";
import Header from "./Header";
import Footer from "./Footer";

export default function ValidateToken({route}: {route: string}) {
    const token = getItem('token');
    return token ? 
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
    :
     <Navigate to={route}/>
}