import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Contact Us | INFAB Semiconductor',
  description: 'Get in touch with the INFAB team for quotes, collaborations, or inquiries about MEMS sensors, microfluidic devices, and semiconductor fabrication services.',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <div className="pt-20">
      <Contact productName={product} />
    </div>
  );
}
