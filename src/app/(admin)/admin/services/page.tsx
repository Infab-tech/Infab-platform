import { prisma } from '@/lib/supabase/prisma';
import type { ServiceItem } from '@prisma/client';
import Link from 'next/link';
import { seedServiceItems, resetServiceItems } from '@/app/actions/services-admin';
import ServiceItemForm from './ServiceItemForm';
import DeleteServiceItemButton from './DeleteServiceItemButton';

export const metadata = { title: 'Services | Admin' };

async function SeedAction() {
  'use server';
  await seedServiceItems();
}

async function ResetAction() {
  'use server';
  await resetServiceItems();
}

const CATEGORY_LABELS: Record<string, string> = {
  'mems-capability': 'MEMS Capabilities',
  'mems-process': 'MEMS Core Processes',
  'micro-design': 'Microfluidics Design',
  'micro-fab': 'Microfluidics Fabrication',
  'micro-device': 'Microfluidic Devices',
};

export default async function ServicesAdminPage() {
  let items: ServiceItem[] = [];
  let isSeeded = false;
  try {
    items = await prisma.serviceItem.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
    isSeeded = items.length > 0;
  } catch (error) {
    console.error("Error fetching services in admin panel:", error);
  }

  const grouped = items.reduce<Record<string, ServiceItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Services</h1>
          <p className="text-[var(--text-secondary)]">Manage service capability items shown on the Services page.</p>
        </div>
        <div className="flex gap-2">
          {!isSeeded ? (
            <form action={SeedAction}>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-sm font-semibold hover:bg-[var(--accent-primary)]/20 transition-colors">
                <i className="ph ph-database"></i> Seed Defaults
              </button>
            </form>
          ) : (
            <form action={ResetAction}>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/20 transition-colors">
                <i className="ph ph-arrow-counter-clockwise"></i> Reset to Defaults
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Add New */}
      <div className="mb-10 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="ph ph-plus-circle text-[var(--accent-primary)]"></i> Add Service Item
        </h2>
        <ServiceItemForm />
      </div>

      {/* Items by category */}
      {Object.keys(CATEGORY_LABELS).map((cat) => {
        const catItems = grouped[cat] ?? [];
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded">
                {CATEGORY_LABELS[cat]}
              </span>
              <span className="text-xs text-[var(--text-secondary)]">({catItems.length} items)</span>
            </h2>
            {catItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border-primary)] py-6 text-center text-sm text-[var(--text-secondary)]">No items in this category yet.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {catItems.map((item: ServiceItem) => (
                  <div key={item.id} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <i className={`ph ${item.icon} text-base text-[var(--accent-primary)]`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</span>
                        {!item.isActive && <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 font-mono">inactive</span>}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/admin/services/${item.id}/edit`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors">
                        <i className="ph ph-pencil"></i> Edit
                      </Link>
                      <DeleteServiceItemButton id={item.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
