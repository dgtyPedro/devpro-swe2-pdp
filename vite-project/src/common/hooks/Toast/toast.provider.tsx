import React, { ReactNode } from 'react';
import { toast, ToastOptions, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContext, ToastType} from "./toast.context.tsx";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const showToast = (message: string, type: ToastType, options?: ToastOptions) => {
        toast[type](message, options);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </ToastContext.Provider>
    );
};