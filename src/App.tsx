import { Outlet, useLocation } from 'react-router';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

// On mappe chaque pathname à un index stable pour la clé d'animation
const PATH_KEYS: Record<string, number> = {};
let keyCounter = 0;

function getAnimKey(pathname: string): number {
  if (!(pathname in PATH_KEYS)) {
    PATH_KEYS[pathname] = keyCounter++;
  }
  return PATH_KEYS[pathname];
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="pt-16">
        <div key={getAnimKey(pathname)} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}