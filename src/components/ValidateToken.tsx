import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { destroyStorage, getItem } from "../storage";

export default function ValidateToken({ route }: { route: string }) {
    const navigateTo = useNavigate()
    useEffect(() => {
        try {
            getItem('token');
        } catch (error) {
            destroyStorage()
            navigateTo(route)
        }
    })
    return (
        <Outlet />
    )
}