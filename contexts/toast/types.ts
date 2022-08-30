export type ToastContext = {
    setToast: ({}: {
        content: string;
        type?: Toast['type'];
        interval?: number;
    }) => void;
    closeToast: () => void;
}
export type Toast = {
    type: 'success' | 'info' | 'error';
    content: string;
}