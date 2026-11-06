import { createBrowserRouter, Navigate } from "react-router";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import AppLayout from "./layouts/AppLayout";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const routes = createBrowserRouter([
    {
        element: <Protected>
            <AppLayout />
        </Protected>,
        children: [
            {
                path: "/",
                element: <Navigate to={"/home"} replace/>
            },
            {
                path: "/home",
                element: <Home/>
            }
        ]
    },
    {
        path: "/register",
        element: <Public>
            <Register/>
        </Public>

    },
    {
        path: "/login",
        element: <Public>
            <Login/>
        </Public>
    }
])
