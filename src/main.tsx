import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import Hero from './components/Hero.tsx';
import Timeline from './components/Timeline.tsx';
import Projects from './components/Project.tsx';
import Contact from './components/Contact.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Hero /> },
        { path: 'parcours', element: <Timeline /> },
        { path: 'projets', element: <Projects /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
  ],
  { basename: '/MyPortfolio' },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);