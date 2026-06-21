import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team | INFAB Semiconductor',
  description: 'Meet the people behind INFAB Semiconductor — founders, scientists, engineers, and business professionals driving India\'s deep-tech MEMS revolution.',
};

/* ── Real team data from infabsemi.com ────────────────────────────────────── */

const founder = {
  name: 'Muthuraman Swaminathan',
  title: 'Founder & CEO',
  bio: 'Driving INFAB\'s mission to create a bridge between fundamental research and industrial deployment through cutting-edge MEMS and microfluidic innovation. Incubated at CeNSE, IISc Bangalore.',
  photo: '/assests/team/muthuraman.jpg',
};

const research = [
  { name: 'Dr. Mohammed Yosuff Caffiyar', title: 'Principal Scientist', bio: 'Leads core MEMS device science, sensor physics, and process development at INFAB\'s cleanroom facilities.', photo: '/assests/team/yosuff.jpg' },
  { name: 'Dr. Saara K', title: 'Research Director', bio: 'Directs research programmes across MEMS sensor architectures and microfluidic platform development.', photo: '/assests/team/saara.jpg' },
];

const engineering = [
  { name: 'Prem A', title: 'Sr. Design Engineer', bio: 'Senior MEMS and sensor design engineer with hands-on experience in layout, simulation, and device qualification.', photo: '/assests/team/prem.jpg' },
  { name: 'Amos Heeber', title: 'Design Engineer', bio: 'Design engineer focused on MEMS device architecture, mask layout, and hardware integration.', photo: '/assests/team/amos.jpg' },
  { name: 'Ragin Raj K', title: 'Hardware Designer', bio: 'Hardware and electronics designer responsible for sensor readout circuits and system integration.', photo: '/assests/team/ragin.jpg' },
  { name: 'Stephen N S', title: 'Project Coordinator', bio: 'Coordinates cross-functional engineering projects, timelines, and customer deliverables.' },
];

const consultants = [
  { name: 'Dr. Kashyap Dhruv', title: 'Software Consultant', bio: 'Advises on embedded firmware, data acquisition systems, and software toolchain for MEMS product lines.' },
  { name: 'Jobin Vijay', title: 'Hardware Design Consultant', bio: 'External hardware design consultant supporting schematic, PCB, and system-level design reviews.', photo: '/assests/team/jobin.jpg' },
  { name: 'Rahul Sharma', title: 'Finance Consultant', bio: 'Financial strategy and startup finance advisor, supporting fundraising, grants, and investor relations.', photo: '/assests/team/rahul.jpg' },
];

const business = [
  { name: 'Dilip Kamat', title: 'Business Development', bio: 'Leads B2B sales, strategic partnerships, and market development for aerospace and healthcare verticals.', photo: '/assests/team/dilip.jpg' },
  { name: 'Rajita M', title: 'Administration', bio: 'Handles administrative operations, procurement, and office coordination across INFAB\'s facilities.', photo: '/assests/team/rajita.jpg' },
  { name: 'Priyanka K C', title: 'Administration', bio: 'Supports day-to-day administrative functions and organisational workflows.', photo: '/assests/team/priyanka.jpg' },
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

interface Member { name: string; title: string; bio?: string; photo?: string; }

/* Large card — founder / leadership. Photo fills the top half. */
function LeadershipCard({ m }: { m: Member }) {
  return (
    <div className="rounded-2xl border border-[var(--accent-primary)]/30 bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/60 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10">
      {/* Photo */}
      <div className="aspect-[4/5] w-full bg-[var(--bg-primary)] border-b border-[var(--accent-primary)]/20 relative overflow-hidden">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[var(--accent-primary)]/40">
            {getInitials(m.name)}
          </div>
        )}
        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
      </div>
      {/* Info */}
      <div className="px-8 pb-8 pt-2">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{m.name}</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] mb-4">{m.title}</p>
        {m.bio && <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>}
      </div>
    </div>
  );
}

/* Regular member card — photo fills the top, info below. */
function MemberCard({ m }: { m: Member }) {
  return (
    <div className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
      {/* Photo */}
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
      {/* Info */}
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight mb-0.5">{m.name}</h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-primary)] mb-3">{m.title}</p>
        {m.bio && <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">The People Behind INFAB</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight max-w-3xl">Our Team</h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-8"></div>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            13 passionate technologists, scientists, and operators building India&apos;s most advanced MEMS and microfluidics company from IISc CeNSE, Bengaluru.
          </p>
        </div>
      </div>

      {/* Founder */}
      <div className="border-b border-[var(--border-primary)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Founder</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Leadership</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="max-w-sm">
            <LeadershipCard m={founder} />
          </div>
        </div>
      </div>

      {/* Research & Science */}
      <div className="border-b border-[var(--border-primary)] py-24 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Science</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Research &amp; Science</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((m) => <MemberCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Engineering */}
      <div className="border-b border-[var(--border-primary)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Technical</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Engineering</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineering.map((m) => <MemberCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Consultants */}
      <div className="border-b border-[var(--border-primary)] py-24 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Advisory</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Consultants</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((m) => <MemberCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Business & Operations */}
      <div className="border-b border-[var(--border-primary)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Operations</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Business &amp; Administration</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.map((m) => <MemberCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

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
