import { createBrowserRouter } from "react-router";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import Home from "./pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const routes = createBrowserRouter([
    {
        path: "/",
        element:  <Protected>
           <Home/>
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