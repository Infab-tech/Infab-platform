import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import News from './components/News';
import Partners from './components/Partners';

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