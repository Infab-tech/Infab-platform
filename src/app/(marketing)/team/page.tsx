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

interface Member { name: string; title: string; bio?: string | null; photo?: string | null; linkedinUrl?: string | null; }

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
    <div className="rounded-2xl border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/60 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10 flex flex-col md:flex-row">
      <div className="w-full aspect-[4/3] md:w-56 md:aspect-auto md:min-h-[280px] bg-[var(--bg-primary)] border-b md:border-b-0 md:border-r border-[var(--accent-primary)]/20 relative overflow-hidden flex-shrink-0">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="(max-width: 768px) 100vw, 224px" className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[var(--accent-primary)]/40 min-h-[300px]">
            {getInitials(m.name)}
          </div>
        )}
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center flex-grow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">{m.name}</h3>
            <p className="font-mono text-sm uppercase tracking-widest text-[var(--accent-primary)] mb-6">{m.title}</p>
          </div>
          {m.linkedinUrl && (
            <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}
              className="flex-shrink-0 w-10 h-10 rounded-lg border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#0077b5]/60 hover:text-[#0077b5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM216,208a8,8,0,0,1-8-8V160a36,36,0,0,0-72,0v40a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A52,52,0,0,1,216,160v40A8,8,0,0,1,216,208ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
            </a>
          )}
        </div>
        {m.bio && <p className="text-base text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>}
      </div>
    </div>
  );
}

/* Regular member card */
function MemberCard({ m }: { m: Member }) {
  return (
    <div className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5 flex items-center p-4 gap-4">
      <div className="w-44 h-44 rounded-xl border border-[var(--border-primary)] relative overflow-hidden flex-shrink-0 bg-[var(--bg-primary)]">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="176px" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5">
            {getInitials(m.name)}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-grow">
        <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight mb-0.5">{m.name}</h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-primary)] mb-1 truncate">{m.title}</p>
        {m.linkedinUrl && (
          <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}
            className="mt-1 w-6 h-6 rounded border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#0077b5]/60 hover:text-[#0077b5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM216,208a8,8,0,0,1-8-8V160a36,36,0,0,0-72,0v40a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A52,52,0,0,1,216,160v40A8,8,0,0,1,216,208ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
          </a>
        )}
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
        membersBySection[r.section].push({ name: r.name, title: r.title, bio: r.bio, photo: r.photoUrl, linkedinUrl: r.linkedinUrl });
      }
    }
  } catch {
    // DB not connected — use fallback
  }

  if (totalCount === 0) {
    // Build from fallback
    for (const m of FALLBACK_TEAM) {
      if (!membersBySection[m.section]) membersBySection[m.section] = [];
      membersBySection[m.section].push({ name: m.name, title: m.title, bio: m.bio, photo: m.photoUrl, linkedinUrl: null });
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
            Passionate technologists, scientists, and operators building India&apos;s most advanced MEMS and microfluidics company from IISc CeNSE, Bengaluru.
          </p>
        </div>
      </div>

      {/* Sections */}
      {SECTION_CONFIG.map((sec) => {
        const members = membersBySection[sec.key] ?? [];
        if (members.length === 0) return null;
        const isFounder = sec.key === 'FOUNDER';
        const cols = isFounder ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

        return (
          <div key={sec.key} className={`border-b border-[var(--border-primary)] py-24${sec.bg ? ' bg-[var(--bg-secondary)]' : ''}`}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12">
                <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">{sec.eyebrow}</span>
                <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">{sec.heading}</h2>
                <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
              </div>
              {isFounder ? (
                <div className="flex flex-col gap-6">
                  {members.map((m) => <LeadershipCard key={m.name} m={m} />)}
                </div>
              ) : (
                <div className={cols}>
                  {members.map((m) => <MemberCard key={m.name} m={m} />)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Careers CTA Banner */}
      <div className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 relative z-10">Join Our Journey</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 relative z-10 text-lg">
              We are always looking for passionate MEMS engineers, process scientists, and deep-tech innovators to join our team in Bengaluru.
            </p>
            <Link
              href="/careers"
              className="relative z-10 inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-[var(--bg-primary)] transition-all hover:brightness-110 shadow-lg shadow-[var(--accent-primary)]/20"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
