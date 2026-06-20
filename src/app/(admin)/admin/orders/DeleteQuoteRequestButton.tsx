'use client';

import { useState } from 'react';
import { deleteQuoteRequest } from '@/app/actions/admin';

interface DeleteQuoteRequestButtonProps {
    quoteId: string;
    userEmail: string;
}

export default function DeleteQuoteRequestButton({ quoteId, userEmail }: DeleteQuoteRequestButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const shortId = quoteId.slice(-8).toUpperCase();
        if (!confirm(`Are you sure you want to delete the quote request #${shortId} from ${userEmail}? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteQuoteRequest(quoteId);

        if (result && !result.success) {
            alert(`Error: ${result.message}`);
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded text-xs font-bold uppercase disabled:opacity-50"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
