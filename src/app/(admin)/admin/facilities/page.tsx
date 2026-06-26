import { prisma } from '@/lib/supabase/prisma';
import Link from 'next/link';
import { seedFacilities, resetFacilities } from '@/app/actions/facilities';
import FacilityForm from './FacilityForm';
import DeleteFacilityButton from './DeleteFacilityButton';

export const metadata = { title: 'Facilities | Admin' };

async function SeedAction() {
  'use server';
  await seedFacilities();
}

async function ResetAction() {
  'use server';
  await resetFacilities();
}

export default async function FacilitiesAdminPage() {
  let facilities: Awaited<ReturnType<typeof prisma.facilityItem.findMany>> = [];
  let isSeeded = false;
  try {
    facilities = await prisma.facilityItem.findMany({ orderBy: { order: 'asc' } });
    isSeeded = facilities.length > 0;
  } catch { /* fallback */ }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Facilities</h1>
          <p className="text-[var(--text-secondary)]">Manage the facility cards shown on the Services page.</p>
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
          <i className="ph ph-plus-circle text-[var(--accent-primary)]"></i> Add Facility
        </h2>
        <FacilityForm />
      </div>

      {/* Existing Items */}
      {facilities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border-primary)] p-12 text-center text-[var(--text-secondary)]">
          No facilities yet. Seed defaults or add one above.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {facilities.map((f) => (
            <div key={f.id} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 flex items-start gap-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                <i className={`ph ${f.icon} text-xl text-[var(--accent-primary)]`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-[var(--text-primary)]">{f.title}</h3>
                  {!f.isActive && <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 font-mono">inactive</span>}
                  {f.isFeatured && <span className="px-2 py-0.5 rounded text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono">featured</span>}
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{f.description}</p>
                {f.photoUrl && (
                  <div className="mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.photoUrl} alt="Facility photo" className="h-12 w-12 rounded object-cover border border-[var(--border-primary)]" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/facilities/${f.id}/edit`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors"
                >
                  <i className="ph ph-pencil"></i> Edit
                </Link>
                <DeleteFacilityButton id={f.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
