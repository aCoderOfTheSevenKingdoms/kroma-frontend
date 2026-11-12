import { createBrowserRouter, Navigate } from "react-router";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import AppLayout from "./layouts/AppLayout";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import CreateEditProduct from "../features/products/pages/CreateEditProduct";
import EditProductRoute from "../features/products/pages/EditProductRoute";
import AddVariantRoute from "../features/products/pages/AddVariantRoute";
import SellerProtected from "./routes/SellerProtected";
import SellerProducts from "@/features/products/pages/SellerProducts";

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
            },
            {
                path: "/products/seller",
                element: (
                    <SellerProtected>
                        <SellerProducts/>
                    </SellerProtected>
                )
            },
            {
                path: "/product/create",
                element: (
                    <SellerProtected>
                        <CreateEditProduct/>
                    </SellerProtected>
                )
            },
            {
                path: "/product/edit/:slug",
                element: (
                    <SellerProtected>
                        <EditProductRoute/>
                    </SellerProtected>
                )
            },
            {
                path: "/product/:slug",
                element: (
                    <SellerProtected>
                        <AddVariantRoute/>
                    </SellerProtected>
                )
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
