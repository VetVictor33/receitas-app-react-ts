import { Outlet, useNavigate } from "react-router-dom";
import { destroyStorage, getItem } from "../storage";
import Header from "./header/Header";
import Footer from "./Footer";
import { useEffect } from "react";

export default function ValidateToken({ route }: { route: string }) {
    const navitateTo = useNavigate()
    useEffect(() => {
        try {
            getItem('token');
        } catch (error) {
            destroyStorage()
            navitateTo(route)
        }
    })
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}