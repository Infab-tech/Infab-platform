'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-[var(--text-primary)]/10 px-4 py-3 sm:px-6 bg-[var(--bg-secondary)] mt-4 rounded-xl">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={createPageURL(currentPage - 1)}
                    className={`relative inline-flex items-center rounded-md border border-[var(--text-primary)]/10 bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                >
                    Previous
                </Link>
                <Link
                    href={createPageURL(currentPage + 1)}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-[var(--text-primary)]/10 bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Showing page <span className="font-medium text-[var(--text-primary)]">{currentPage}</span> of <span className="font-medium text-[var(--text-primary)]">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={createPageURL(currentPage - 1)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-[var(--text-secondary)] ring-1 ring-inset ring-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 focus:z-20 focus:outline-offset-0 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <span className="sr-only">Previous</span>
                            <i className="ph ph-caret-left h-5 w-5 flex items-center justify-center"></i>
                        </Link>
                        {/* Simple page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={createPageURL(page)}
                                aria-current={page === currentPage ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-[var(--text-primary)]/10 focus:z-20 focus:outline-offset-0 ${
                                    page === currentPage
                                        ? 'z-10 bg-[var(--accent-primary)] text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]'
                                        : 'text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                        <Link
                            href={createPageURL(currentPage + 1)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-[var(--text-secondary)] ring-1 ring-inset ring-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 focus:z-20 focus:outline-offset-0 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <span className="sr-only">Next</span>
                            <i className="ph ph-caret-right h-5 w-5 flex items-center justify-center"></i>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
