import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Products />
      <News />
      <Partners />
      {/* Future sections will go here below the Hero */}
      <div className="h-screen bg-[var(--bg-primary)]"></div>
    </div>
  );
}