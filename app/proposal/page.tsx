'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProposalCard from '@/components/ProposalCard';
import Link from 'next/link';

function ProposalContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'My Valentine';

    return (
        <>
            <ProposalCard name={name} interactive={true} />

            {/* Footer / Create your own link */}
            <Link
                href="/"
                className="fixed bottom-4 right-4 text-xs text-gray-400 hover:text-gray-600 underline opacity-50 hover:opacity-100 transition-opacity"
            >
                Make your own
            </Link>
        </>
    );
}

export default function ProposalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-pink-100">Loading love letter...</div>}>
            <ProposalContent />
        </Suspense>
    );
}
