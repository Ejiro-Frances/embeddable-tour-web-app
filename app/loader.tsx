import React from 'react';
import Loader from '@/components/loader';

export default function LoaderPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background gap-6">
            <Loader size="lg" />
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-xl font-medium text-foreground">
                    Loading Application
                </h2>
                <p className="text-sm text-muted-foreground animate-pulse">
                    Preparing your tour experience...
                </p>
            </div>
        </div>
    );
}
