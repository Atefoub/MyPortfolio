import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Project';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';

function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation avec ThemeToggle intégré */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo organique pulsant */}
            <Logo />
            
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="relative text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 group"
              >
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#parcours"
                className="relative text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 group"
              >
                Parcours
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#projects"
                className="relative text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 group"
              >
                Projets
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="relative text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              {/* Theme Toggle intégré dans la navigation */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <main className="pt-16">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;