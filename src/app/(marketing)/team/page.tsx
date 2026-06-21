import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_TEAM } from '@/lib/content-defaults';

export const metadata: Metadata = {
  title: 'Our Team | INFAB Semiconductor',
  description: 'Meet the people behind INFAB Semiconductor — founders, scientists, engineers, and business professionals driving India\'s deep-tech MEMS revolution.',
};

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Member { name: string; title: string; bio?: string | null; photo?: string | null; }

const SECTION_CONFIG: Array<{ key: string; eyebrow: string; heading: string; alt: string; bg: boolean }> = [
  { key: 'FOUNDER',     eyebrow: 'Founder',    heading: 'Leadership',                alt: 'founder',     bg: false },
  { key: 'RESEARCH',    eyebrow: 'Science',    heading: 'Research & Science',        alt: 'research',    bg: true  },
  { key: 'ENGINEERING', eyebrow: 'Technical',  heading: 'Engineering',               alt: 'engineering', bg: false },
  { key: 'CONSULTANTS', eyebrow: 'Advisory',   heading: 'Consultants',               alt: 'consultants', bg: true  },
  { key: 'BUSINESS',    eyebrow: 'Operations', heading: 'Business & Administration', alt: 'business',    bg: false },
  { key: 'INTERN',      eyebrow: 'Next Gen',   heading: 'Interns',                   alt: 'interns',     bg: true  },
];

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Prof\.)\s+/, '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
}

/* Large card — founder / leadership */
function LeadershipCard({ m }: { m: Member }) {
  return (
    <div className="rounded-2xl border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/60 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10">
      <div className="aspect-[4/5] w-full bg-[var(--bg-primary)] border-b border-[var(--accent-primary)]/20 relative overflow-hidden">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[var(--accent-primary)]/40">
            {getInitials(m.name)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
      </div>
      <div className="px-8 pb-8 pt-2">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{m.name}</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] mb-4">{m.title}</p>
        {m.bio && <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>}
      </div>
    </div>
  );
}

/* Regular member card */
function MemberCard({ m }: { m: Member }) {
  return (
    <div className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
      <div className="aspect-[4/5] w-full bg-[var(--bg-primary)] border-b border-[var(--border-primary)] relative overflow-hidden">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5">
            {getInitials(m.name)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
      </div>
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight mb-0.5">{m.name}</h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-primary)] mb-3">{m.title}</p>
        {m.bio && <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function TeamPage() {
  // Try DB first; fall back to static defaults if empty
  let membersBySection: Record<string, Member[]> = {};
  let totalCount = 0;

  try {
    const rows = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ section: 'asc' }, { order: 'asc' }],
    });

    if (rows.length > 0) {
      totalCount = rows.length;
      for (const r of rows) {
        if (!membersBySection[r.section]) membersBySection[r.section] = [];
        membersBySection[r.section].push({ name: r.name, title: r.title, bio: r.bio, photo: r.photoUrl });
      }
    }
  } catch {
    // DB not connected — use fallback
  }

  if (totalCount === 0) {
    // Build from fallback
    for (const m of FALLBACK_TEAM) {
      if (!membersBySection[m.section]) membersBySection[m.section] = [];
      membersBySection[m.section].push({ name: m.name, title: m.title, bio: m.bio, photo: m.photoUrl });
      totalCount++;
    }
  }

  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">The People Behind INFAB</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">Our Team</h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {totalCount} passionate technologists, scientists, and operators building India&apos;s most advanced MEMS and microfluidics company from IISc CeNSE, Bengaluru.
          </p>
        </div>
      </div>

      {/* Sections */}
      {SECTION_CONFIG.map((sec) => {
        const members = membersBySection[sec.key] ?? [];
        if (members.length === 0) return null;
        const isFounder = sec.key === 'FOUNDER';
        const cols = isFounder ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
        const engineeringCols = sec.key === 'ENGINEERING' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : cols;

        return (
          <div key={sec.key} className={`border-b border-[var(--border-primary)] py-24${sec.bg ? ' bg-[var(--bg-secondary)]' : ''}`}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12">
                <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">{sec.eyebrow}</span>
                <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">{sec.heading}</h2>
                <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
              </div>
              {isFounder ? (
                <div className="max-w-sm">
                  <LeadershipCard m={members[0]} />
                </div>
              ) : (
                <div className={sec.key === 'ENGINEERING' ? engineeringCols : cols}>
                  {members.map((m) => <MemberCard key={m.name} m={m} />)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Careers CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Join Our Journey</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            We are always looking for passionate MEMS engineers, process scientists, and deep-tech innovators to join our facility in Bengaluru.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
          >
            Get in Touch
          </Link>
        </div>
      </div>

    </div>
  );
}
