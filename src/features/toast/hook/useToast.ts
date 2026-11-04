import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../state/toast.slice";
import type { ToastVariant } from "../toast.types";

export const useToast = () => {
  const dispatch = useDispatch();

  const notify = useCallback(
    (
      variant: ToastVariant,
      title: string,
      description?: string,
      duration?: number
    ) => {
      dispatch(showToast({ title, description, variant, duration }));
    },
    [dispatch]
  );

  return {
    success: (title: string, description?: string, duration?: number) =>
      notify("success", title, description, duration),
    error: (title: string, description?: string, duration?: number) =>
      notify("error", title, description, duration),
    info: (title: string, description?: string, duration?: number) =>
      notify("info", title, description, duration),
    warning: (title: string, description?: string, duration?: number) =>
      notify("warning", title, description, duration),
  };
};
