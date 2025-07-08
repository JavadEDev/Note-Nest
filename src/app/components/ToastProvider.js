// ToastProvider.js
// Usage: import { ToastProvider, ToastEmitter } from './ToastProvider'
// Then use ToastEmitter.success('...'), ToastEmitter.error('...'), etc. anywhere in your app.
'use client'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastEmitter = {
    info: (msg, opts) => toast.info(msg, opts),
    success: (msg, opts) => toast.success(msg, opts),
    warning: (msg, opts) => toast.warning(msg, opts),
    error: (msg, opts) => toast.error(msg, opts),
}

export default function ToastProvider() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
} 