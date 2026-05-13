import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from 'sonner';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <Toaster
                    position="top-right"
                    richColors
                    toastOptions={{
                        style: {
                            background: '#1c1c1c',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                        },
                    }}
                />
            </>
        );
    },
});