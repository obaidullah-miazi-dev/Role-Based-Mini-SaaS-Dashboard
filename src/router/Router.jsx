import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/dashboard/DashboardHome";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component:MainLayout,
        children:[
            {
                index: true,
                Component: Home
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