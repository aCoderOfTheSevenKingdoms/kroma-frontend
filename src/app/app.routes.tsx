import { createBrowserRouter, Navigate } from "react-router";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const routes = createBrowserRouter([
    {
        path: "/",
        element:  <Protected>
           <Navigate to={"/home"} replace/>
        </Protected>
    },
    {
        path: "/home",
        element:  <Protected>
           <Home/>
        </Protected>
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