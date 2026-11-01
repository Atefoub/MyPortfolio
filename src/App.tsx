import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { rememberCampaign, trackPage } from './lib/analytics';
import { useKeyboardNav } from './lib/hooks';

export default function App() {
  useKeyboardNav();
  const { pathname } = useLocation();

  useEffect(() => {
    rememberCampaign();
    trackPage();
  }, [pathname]);

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