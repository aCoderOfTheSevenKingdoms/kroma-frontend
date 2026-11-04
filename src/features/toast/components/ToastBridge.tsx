import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { RootState } from "@/app/app.store";
import { dismissToast } from "../state/toast.slice";

const variantRenderer = {
  success: toast.success,
  error: toast.error,
  info: toast.info,
  warning: toast.warning,
};

export const ToastBridge = () => {
  const queue = useSelector((state: RootState) => state.toast.queue);
  const dispatch = useDispatch();

  useEffect(() => {
    queue.forEach((item) => {
      variantRenderer[item.variant](item.title, {
        id: item.id,
        description: item.description,
        duration: item.duration,
      });

      dispatch(dismissToast(item.id));
    });
  }, [queue, dispatch]);

  return null;
};
