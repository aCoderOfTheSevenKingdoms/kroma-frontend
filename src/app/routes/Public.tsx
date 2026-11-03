import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../app.store";

const Public = ({children}: {children: ReactNode}): ReactNode => {
    const user = useSelector((state: RootState) => state.auth.user);
    if(user) {
        return <Navigate to="/home" replace></Navigate>
    }
    return children;
}

export default Public;