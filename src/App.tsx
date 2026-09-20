import { Outlet } from 'react-router';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { useKeyboardNav } from './lib/hooks';

export default function App() {
  useKeyboardNav();

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="page-shell pt-16">
        <Outlet />
      </main>
    </div>
  );
}