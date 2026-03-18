import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Send,
  CheckCircle,
  Calendar,
  Briefcase,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { FORMSPREE_ENDPOINT, ANIMATION_DELAYS, CV_PATH } from '../lib/constants';
import { useFormSubmit } from '../lib/hooks';
import SectionHeader from './SectionHeader';

const AVAILABILITY = [
  {
    icon: Calendar,
    title: 'Stage · 8 semaines',
    subtitle: '08 juin – 24 juillet 2026',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'Alternance · 24 mois',
    subtitle: 'Dès sept. 2026 · Nantes / Ancenis / Angers · Remote possible',
    color: 'blue',
  },
] as const;

const CONTACT_LINKS = [
  { icon: Github,   href: 'https://github.com/Atefoub',                            label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/antoine-mourin-0033ab233/', label: 'LinkedIn' },
  { icon: FileText, href: CV_PATH,                                                  label: 'CV'       },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { status, submit } = useFormSubmit(FORMSPREE_ENDPOINT);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await submit(formData);
    if (success) setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      className="contact-section flex flex-col px-4 sm:px-6 md:px-8 lg:px-16"
      id="contact"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col flex-1 min-h-0 py-3 sm:py-4 md:py-6">

        {/* En-tête */}
        <div className="shrink-0 mb-2 sm:mb-3">
          <SectionHeader
            title="Contact"
            icon={<Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            className="mb-1.5"
          />
        </div>

        {/* Badges dispo */}
        <div
          className={`flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3 shrink-0 animate-slide-up ${ANIMATION_DELAYS.SHORT}`}
        >
          {AVAILABILITY.map(({ icon: Icon, title, subtitle, color }) => (
            <div key={title} className={`avail-badge avail-badge-${color}`}>
              <div className={`avail-badge-icon-wrap avail-icon-${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="avail-badge-text">
                <div className="avail-badge-title">{title}</div>
                <div className="avail-badge-subtitle">{subtitle}</div>
              </div>
              <span className="status-dot-wrap">
                <span className={`status-ping status-ping-${color}`} />
                <span className={`status-dot status-dot-${color}`} />
              </span>
            </div>
          ))}
        </div>

        {/* Grille 2 colonnes desktop */}
        <div
          className={`grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3 flex-1 min-h-0 animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}
        >
          <ContactInfo />
          <ContactForm
            formData={formData}
            status={status}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>

        <Footer />
      </div>
    </section>
  );
}

const LINK_COLORS: Record<string, { border: string; text: string; bg: string; hover: string }> = {
  GitHub:   { border: 'border-foreground/30',  text: 'text-foreground',                  bg: 'bg-background',                  hover: 'hover:border-foreground hover:bg-foreground hover:text-background' },
  LinkedIn: { border: 'border-blue-400/50',    text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', hover: 'hover:border-blue-500 hover:bg-blue-500 hover:text-white' },
  CV:       { border: 'border-accent/60',      text: 'text-accent-foreground',           bg: 'bg-accent/10',                   hover: 'hover:bg-accent hover:text-accent-foreground hover:border-accent' },
};

function ContactInfo() {
  return (
    <div className="flex flex-col bg-muted rounded-xl p-4 sm:p-5 gap-4">

      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Informations
        </p>

        {/* Email */}
        <a
          href="mailto:antoinem1pro@gmail.com"
          className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/5 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 text-accent shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Email</span>
            <span className="text-xs font-medium text-foreground truncate">antoinem1pro@gmail.com</span>
          </div>
        </a>

        {/* Téléphone */}
        <a
          href="tel:+33613036351"
          className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/5 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 text-accent shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Téléphone</span>
            <span className="text-xs font-medium text-foreground truncate">06 13 03 63 51</span>
          </div>
        </a>

        {/* Localisation */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-background border border-border">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 text-accent shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Localisation</span>
            <span className="text-xs font-medium text-foreground">Anetz (44150) · Pays de la Loire</span>
          </div>
        </div>

        {/* Mobilité */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-background border border-border">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 text-accent shrink-0">
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Mobilité</span>
            <span className="text-xs font-medium text-foreground">Nantes · Ancenis · Angers</span>
          </div>
        </div>
      </div>

      {/* Grandes icônes liens */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Retrouvez-moi sur
        </p>
        <div className="grid grid-cols-3 gap-2">
          {CONTACT_LINKS.map(({ icon: Icon, href, label }) => {
            const colors = LINK_COLORS[label];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border bg-background transition-all duration-200 hover:scale-105 ${colors.border} ${colors.hover}`}
                title={label}
              >
                <Icon className="w-8 h-8" />
                <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function ContactForm({
  formData,
  status,
  onSubmit,
  onChange,
}: {
  formData: { name: string; email: string; message: string };
  status: 'idle' | 'sending' | 'success' | 'error';
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  if (status === 'success') {
    return (
      <div className="bg-muted rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <p className="text-sm font-semibold">Message envoyé !</p>
        <p className="text-xs text-muted-foreground">
          Je vous répondrai dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted rounded-xl p-2.5 sm:p-3 flex flex-col min-h-0">
      <h3 className="text-xs sm:text-sm font-semibold mb-0.5">Envoyer un message</h3>
      <p className="text-[10px] text-muted-foreground mb-1.5 sm:mb-2">
        Tous les champs sont obligatoires.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-1.5 flex-1" noValidate>
        <FormField
          id="name"
          label="Nom"
          type="text"
          value={formData.name}
          onChange={onChange}
          disabled={status === 'sending'}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={onChange}
          disabled={status === 'sending'}
          placeholder="vous@exemple.com"
        />
        <FormField
          id="message"
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={onChange}
          disabled={status === 'sending'}
          placeholder="Parlez-moi de votre projet..."
          rows={6}
        />

        {status === 'error' && (
          <p className="text-xs text-red-500">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="self-start mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-[10px] sm:text-xs font-medium hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 active:scale-95"
        >
          {status === 'sending' ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
              Envoi…
            </>
          ) : (
            <>
              <Send className="w-3 h-3" />
              Envoyer
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  placeholder,
  rows,
}: {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  placeholder?: string;
  rows?: number;
}) {
  const baseClasses =
    'px-2.5 py-1.5 rounded-lg bg-background border border-border text-xs placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 transition-shadow duration-200';

  return (
    <div className={`flex flex-col gap-0.5 ${type === 'textarea' ? 'flex-1' : ''}`}>
      <label htmlFor={id} className="text-[10px] font-medium">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          className={`${baseClasses} resize-none flex-1`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={id}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function Footer() {
  return (
    <div className="shrink-0 mt-2 pt-2 border-t border-border text-center text-muted-foreground">
      <p className="text-[10px] sm:text-xs">
        &copy; {new Date().getFullYear()} Antoine Mourin. Tous droits réservés.
      </p>
    </div>
  );
}