export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastPayload = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

export type ToastItem = Omit<ToastPayload, "variant"> & {
  id: string;
  variant: ToastVariant;
};
