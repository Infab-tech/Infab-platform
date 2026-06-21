import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Contact Us | INFAB Semiconductor',
  description: 'Get in touch with the INFAB team for quotes, collaborations, or inquiries about MEMS sensors, microfluidic devices, and semiconductor fabrication services.',
};

export default function ContactPage() {
  return (
    <div className="pt-20"> {/* Padding to account for the sticky navbar */}
      <Contact />
    </div>
  );
}
