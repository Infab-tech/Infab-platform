'use client';

import { useState } from 'react';
import { deleteCustomerAccount } from '@/app/actions/users';

export default function DeleteUserButton({ userId, userEmail }: { userId: string, userEmail: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to completely delete ${userEmail} from the database? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteCustomerAccount(userId, userEmail);
        
        if (result && !result.success) {
            alert(`Error: ${result.message}`);
            setIsDeleting(false);
        }
        // On success, Next.js revalidatePath will automatically refresh the page
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-[var(--text-primary)] transition-colors rounded text-xs font-bold uppercase disabled:opacity-50"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
