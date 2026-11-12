import { Navigate } from "react-router"
import { useSelector } from "react-redux"
import type { RootState } from "../app.store"

interface SellerProtectedProps {
    children: React.ReactNode
}

const SellerProtected = ({children}: SellerProtectedProps) => {
    
    const {user} = useSelector((state: RootState) => state.auth);
  
    if(!user) {
        return <Navigate to="/login" replace />
    }

    if(user.user_type !== "seller") {
        return <Navigate to="/error" replace />
    } 

    return <>{children}</>
}

export default SellerProtected
