import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import CtaBanner from '@/components/sections/CtaBanner';
import News from '@/components/sections/News';
import Partners from '@/components/sections/Partners';
import Recognitions from '@/components/sections/Recognitions';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Products />
      <CtaBanner />
      <News />
      <Partners />
      <Recognitions limit={3} />
    </div>
  );
}
