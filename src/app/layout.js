import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'INFAB Semiconductor | Advanced MEMS & Microfluidic Solutions',
  description: 'Pioneering Indian deep-tech company specializing in advanced MEMS sensors, actuators, and medical microfluidic devices. Incubated at CeNSE, IISc Bengaluru.',
  keywords: 'INFAB, Semiconductor, MEMS, Microfluidics, Aerospace sensors, Pressure transducers, IISc Bangalore, CeNSE, Deep-tech India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Inject Phosphor Icons */}
      <head>
        <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}