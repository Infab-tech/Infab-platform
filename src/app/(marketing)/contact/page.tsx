import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Contact Us | INFAB Semiconductor',
};

export default function ContactPage() {
  return (
    <div className="pt-20"> {/* Padding to account for the sticky navbar */}
      <Contact />
    </div>
  );
}
