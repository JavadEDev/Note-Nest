'use client';

import { Suspense } from 'react';
import AuthErrorPage from './AuthErrorPage';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <AuthErrorPage />
        </Suspense>
    );
} 