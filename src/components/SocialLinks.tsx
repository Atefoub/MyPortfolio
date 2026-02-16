import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/constants';
import Button from './Button';

const iconMap = { Github, Linkedin, Mail };

export default function SocialLinks({ variant = 'ghost', size = 'md' }: { variant?: 'ghost' | 'primary'; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex gap-3">
      {SOCIAL_LINKS.map(({ href, icon, label }) => {
        const Icon = iconMap[icon as keyof typeof iconMap];
        return (
          <Button
            key={href}
            as="a"
            variant={variant}
            size={size}
            icon={<Icon />}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          />
        );
      })}
    </div>
  );
}