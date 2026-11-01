import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/hooks';
import Button from './Button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="md"
      icon={theme === 'light' ? <Moon /> : <Sun />}
      onClick={toggleTheme}
      aria-label="Basculer le thème"
      className="shadow-lg"
    />
  );
}