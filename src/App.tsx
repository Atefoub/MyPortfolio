import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Project';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}