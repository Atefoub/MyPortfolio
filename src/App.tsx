import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Project';
import Contact from './components/Contact';
import { type ViewId } from './lib/constants';

let viewKey = 0;

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('hero');
  const [animKey, setAnimKey] = useState(0);

  const handleNavigate = useCallback((view: ViewId) => {
    setActiveView(view);
    setAnimKey(++viewKey);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation activeView={activeView} onNavigate={handleNavigate} />
      <main className="pt-16">
        <div key={animKey} className="animate-fade-in">
          {activeView === 'hero'     && <Hero onNavigate={handleNavigate} />}
          {activeView === 'parcours' && <Timeline />}
          {activeView === 'projects' && <Projects />}
          {activeView === 'contact'  && <Contact />}
        </div>
      </main>
    </div>
  );
}