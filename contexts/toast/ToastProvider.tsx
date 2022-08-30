import React, { useCallback, useState } from "react";
import { AnimatePresence } from 'framer-motion';
import { Toast } from "./Toast";
import { Toast as ToastType, ToastContext as ToastContextType } from "./types";

const ToastContext = React.createContext({} as ToastContextType);

export const useToast = () => React.useContext(ToastContext);

export const ToastProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [toast, setToast] = useState<ToastType | null>(null);

    const _setToast = useCallback(({ content, type='info', interval=5000 }: {
        content: string;
        type?: ToastType['type'];
        interval?: number;
    }) => {
        setToast({ content, type });

        // Closing after time interval
        setTimeout(closeToast, interval);
    }, [setToast])
    const closeToast = useCallback(() => {
        setToast(null);
    }, [setToast]);

    const value = {
        setToast: _setToast,
        closeToast
    }
    return(
        <ToastContext.Provider value={value}>
            <AnimatePresence>
                {toast && (
                    <Toast 
                        {...toast}
                    />
                )}
            </AnimatePresence>

            {children}
        </ToastContext.Provider>
    )
}