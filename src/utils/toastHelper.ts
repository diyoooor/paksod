import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = { position: "top-center" };

export const showSuccess = (message: string) => {
  toast.success(message, options);
};

export const showError = (message: string) => {
  toast.error(message, options);
};

export const showInfo = (message: string) => {
  toast.info(message, options);
};

export const showWarning = (message: string) => {
  toast.warn(message, options);
};
