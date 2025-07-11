import { Suspense } from 'react';
import AuthSignInPage from './AuthSignInPage';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <AuthSignInPage />
        </Suspense>
    );
} 