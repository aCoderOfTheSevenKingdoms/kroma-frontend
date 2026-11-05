import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import type { RootState } from "../app.store"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hook/useAuth";

const Home = () => {

  const user = useSelector((state: RootState) => state.auth.user); 
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    const result = await handleLogout();
    if (result.success) {
      navigate("/login");
    }
  }

  return (
    <div>
      Welcome Home, {user?.fullname || "Guest"} You're a {user?.user_type}
      <Button
        type="button"
        variant="outline"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  )
}

export default Home
