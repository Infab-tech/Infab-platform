import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team | INFAB Semiconductor',
  description: 'Meet the passionate technologists, researchers, and industry veterans driving INFAB Semiconductor forward.',
};

const leadership = [
  { name: 'Dr. Srinivas Kumar', title: 'Founder & CEO', bio: 'Ph.D. in MEMS Engineering from IISc. 18+ years of experience in microsystems design and semiconductor manufacturing. Previously at DRDO and Intel.' },
  { name: 'Dr. Priya Menon', title: 'Co-Founder & CTO', bio: 'Ph.D. in Microfluidics from IIT Bombay. Expert in lab-on-chip design and bioMEMS. Led R&D at a leading semiconductor foundry for 12 years before co-founding INFAB.' },
  { name: 'Mr. Ramesh Venkat', title: 'Chief Operating Officer', bio: 'MBA from IIM Bangalore with 15 years in semiconductor operations. Extensive experience scaling deep-tech startups from lab to manufacturing.' },
  { name: 'Dr. Ananya Sharma', title: 'Head of Research', bio: 'Ph.D. from IISER Pune, specialised in piezoelectric MEMS and sensor integration. Published 25+ peer-reviewed papers and holds 4 patents.' },
];

const engineering = [
  { name: 'Mr. Karthik Rao', title: 'Senior Process Engineer', bio: 'Specialist in deep reactive ion etching (DRIE) and silicon-on-insulator (SOI) processes. 10 years of cleanroom fabrication experience.' },
  { name: 'Ms. Nisha Patel', title: 'MEMS Design Engineer', bio: 'Expert in FEM-based MEMS design, layout, and simulation using COMSOL and ANSYS. Specialises in pressure and inertial sensor design.' },
  { name: 'Mr. Vijay Joshi', title: 'Packaging Engineer', bio: "Specialises in wafer-level chip scale packaging (WLCSP), flip-chip bonding, and hermetic sealing for harsh-environment sensors." },
  { name: 'Ms. Sowmya Reddy', title: 'Microfluidics Engineer', bio: 'Expert in soft lithography, PDMS fabrication, and glass bonding for microfluidic chip manufacturing. M.Tech from IIT Madras.' },
];

const business = [
  { name: 'Mr. Amit Kumar', title: 'Head of Sales & BD', bio: '15 years in industrial and defence sensor sales. Manages key accounts across aerospace OEMs and government research laboratories.' },
  { name: 'Ms. Divya Mohan', title: 'Marketing Manager', bio: 'Experienced in B2B technology marketing for deep-tech and semiconductor companies. Leads digital, events, and communications strategy.' },
  { name: 'Mr. Suresh Bhat', title: 'Finance & Operations', bio: "CA with 12 years in startup finance, regulatory compliance, and fundraising. Managed INFAB's Series A raise and government grant applications." },
  { name: 'Ms. Rashmi Pillai', title: 'Quality Assurance', bio: 'ISO 9001 and AS9100 certified quality manager. Oversees process qualification, product testing, and customer quality documentation.' },
];

const advisors = [
  { name: 'Prof. P. K. Nayak', title: 'Professor, IISc CeNSE', bio: 'Pioneer in silicon MEMS fabrication in India. 30+ years at CeNSE, IISc. Mentor and incubator faculty for INFAB Semiconductor.' },
  { name: 'Dr. Rekha Singh', title: 'Former Director, CSIR-CEERI', bio: 'Distinguished scientist with expertise in MEMS-based sensors and IoT for industrial and defence applications. Advisor on product strategy.' },
  { name: 'Dr. Mohan Narayanan', title: 'VP Engineering, Analog Devices (Retd.)', bio: '35 years at Analog Devices including leadership of the MEMS sensor product line. Advises on commercialisation and global market entry.' },
  { name: 'Prof. Sunita Gupta', title: 'Professor, IIT Delhi', bio: 'Expert in BioMEMS and microfluidics for medical diagnostics. Collaborates on research and co-development of lab-on-chip platforms.' },
  { name: 'Mr. Venkat Rao', title: 'Managing Director, HAL Systems', bio: 'Industry veteran with 28 years at HAL. Guides aerospace product qualification, MIL-spec compliance, and defence customer relationships.' },
  { name: 'Dr. Laura Chen', title: 'Senior Scientist, MIT Lincoln Lab', bio: 'International advisor specialising in MEMS packaging and heterogeneous integration. Supports global partnerships and IP strategy.' },
];

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Prof\.)\s+/, '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
}

interface Member { name: string; title: string; bio: string; }

function LeadershipCard({ m }: { m: Member }) {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex-shrink-0 flex items-center justify-center font-bold text-xl text-[var(--accent-primary)]">
          {getInitials(m.name)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{m.name}</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)]">{m.title}</p>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>
    </div>
  );
}

function CompactCard({ m }: { m: Member }) {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex-shrink-0 flex items-center justify-center font-bold text-base text-[var(--accent-primary)]">
          {getInitials(m.name)}
        </div>
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">{m.name}</h3>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-primary)]">{m.title}</p>
        </div>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>
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
            Driven by a team of passionate technologists, researchers, and industry veterans — shaping the future of MEMS technology in India and globally.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Leadership</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Founders &amp; Executives</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((m) => <LeadershipCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Engineering */}
      <div className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Technical</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Engineering &amp; Fabrication</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineering.map((m) => <CompactCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Business */}
      <div className="border-b border-[var(--border-primary)] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Commercial</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Business &amp; Sales</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {business.map((m) => <CompactCard key={m.name} m={m} />)}
          </div>
        </div>
      </div>

      {/* Advisory Board */}
      <div className="border-b border-[var(--border-primary)] py-32 bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Advisors</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">Scientific Advisory Board</h2>
            <div className="w-12 h-1 bg-[var(--accent-primary)] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((m) => (
              <div key={m.name} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 flex-shrink-0 flex items-center justify-center font-bold text-base text-[var(--accent-primary)]">
                    {getInitials(m.name)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">{m.name}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{m.title}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Careers CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Join Our Journey</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            We are always looking for passionate process engineers, MEMS designers, and deep-tech innovators to join our facility in Bengaluru.
          </p>
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110">
            View Open Positions
          </Link>
        </div>
      </div>

    </div>
  );
}
