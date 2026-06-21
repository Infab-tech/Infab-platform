'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    href: string;
    icon: string;
    label: string;
    exact?: boolean;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
    {
        title: 'Overview',
        items: [
            { href: '/admin', icon: 'ph-squares-four', label: 'Dashboard', exact: true },
        ],
    },
    {
        title: 'Operations',
        items: [
            { href: '/admin/inquiries', icon: 'ph-envelope-simple', label: 'Inquiries' },
            { href: '/admin/orders', icon: 'ph-receipt', label: 'Quote Requests' },
        ],
    },
    {
        title: 'Content',
        items: [
            { href: '/admin/products', icon: 'ph-package', label: 'Products' },
            { href: '/admin/news', icon: 'ph-newspaper', label: 'News' },
            { href: '/admin/team', icon: 'ph-users-three', label: 'Team' },
            { href: '/admin/publications', icon: 'ph-books', label: 'Publications' },
            { href: '/admin/partners', icon: 'ph-handshake', label: 'Partners' },
        ],
    },
    {
        title: 'Access',
        items: [
            { href: '/admin/staff', icon: 'ph-shield-check', label: 'Staff Access' },
            { href: '/admin/users', icon: 'ph-users', label: 'Users' },
        ],
    },
];

export default function AdminSidebarNav() {
    const pathname = usePathname();

    const isActive = (item: NavItem) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    return (
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
            {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="mb-3">
                    <div className="px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]/50 mb-1">
                        {section.title}
                    </div>
                    {section.items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                                isActive(item)
                                    ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                                    : 'hover:bg-[var(--text-primary)]/5 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
                            }`}
                        >
                            <i className={`ph ${item.icon} text-lg ${isActive(item) ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}></i>
                            {item.label}
                        </Link>
                    ))}
                </div>
            ))}
        </nav>
    );
}
