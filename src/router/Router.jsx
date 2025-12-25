import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/dashboard/DashboardHome";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component:MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children:[
            {
                index: true,
                Component: DashboardHome
            }
        ]
    }
])