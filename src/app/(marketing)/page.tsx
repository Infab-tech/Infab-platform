import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import Publications from '@/components/sections/Publications';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Products />
      <News />
      <Partners />
      <Publications />
    </div>
  );
}