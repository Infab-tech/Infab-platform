'use client';

import { useState } from 'react';
import { deleteInquiry } from '@/app/actions/admin';

export default function DeleteInquiryButton({ inquiryId }: { inquiryId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteInquiry(inquiryId);

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
