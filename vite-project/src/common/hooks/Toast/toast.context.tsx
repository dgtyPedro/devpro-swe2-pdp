import {createContext, useContext} from "react";
import {ToastOptions} from "react-toastify";

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastContextProps {
    showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
