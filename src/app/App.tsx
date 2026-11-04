import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hook/useAuth";
import { ToastBridge } from "@/features/toast/components/ToastBridge";
import { Toaster } from "@/components/ui/sonner";
import { routes } from "./app.routes";

function App() {
  const { bootstrap } = useAuth();

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastBridge/>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App
