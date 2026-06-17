"use client";

import React from 'react';
import Link from 'next/link';
import { logger } from '@/services/logger';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    React.useEffect(() => {
        // Log the error to error reporting service
        logger.error('Page error occurred', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col items-center justify-center px-4 py-8">
            <div className="glass-card rounded-[2.5rem] p-12 max-w-lg w-full text-center shadow-xl">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-3xl font-heading font-bold text-[hsl(var(--text-main))] mb-4">
                    Oups ! Une erreur s&apos;est produite
                </h1>

                <p className="text-stone-500 mb-2 text-lg font-light">
                    Nous avons rencontré un problème.
                </p>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg text-left">
                        <p className="text-sm text-red-700 font-mono break-words">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-3 mt-8">
                    <button
                        onClick={() => reset()}
                        className="btn-primary w-full"
                    >
                        Réessayer
                    </button>

                    <Link
                        href="/"
                        className="btn-secondary w-full"
                    >
                        Retour à l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
