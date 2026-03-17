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
} from 'lucide-react';
import { FORMSPREE_ENDPOINT, ANIMATION_DELAYS, CV_PATH } from '../lib/constants';
import { useFormSubmit } from '../lib/hooks';

const AVAILABILITY = [
  {
    icon: Calendar,
    title: 'Stage - 2 mois',
    subtitle: 'Disponible à partir de juin 2026',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'Alternance - 24 mois',
    subtitle: 'Dès septembre 2026 (RNCP niveau 7)',
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
        <div className="shrink-0 mb-2 sm:mb-3 animate-fade-in">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5">Contact</h2>
          <div className="w-12 sm:w-16 h-1 bg-accent mb-1.5 sm:mb-2" />
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Vous avez un projet en tête, une opportunité de stage ou d'alternance ? N'hésitez pas à me contacter&nbsp;!
          </p>
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

        <div
          className={`flex flex-col gap-2 sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-3 sm:flex-1 sm:min-h-0 animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}
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

function ContactInfo() {
  return (
    <div className="flex flex-col gap-1.5 bg-muted rounded-xl p-2 sm:p-3 sm:h-full sm:justify-center">

      <a
        href="mailto:antoinem1pro@gmail.com"
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground rounded-full font-medium hover:scale-105 transition-transform duration-300 text-xs w-fit"
      >
        <Mail className="w-3.5 h-3.5" />
        antoinem1pro@gmail.com
      </a>

      <div className="hidden sm:flex items-start gap-2 px-2 py-1.5 text-muted-foreground">
        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <div className="font-medium text-foreground text-xs">Anetz (44150)</div>
          <div className="text-[10px]">Région Pays de la Loire</div>
        </div>
      </div>

      <div className="hidden sm:block border-t border-border" />

      <div className="flex flex-wrap gap-1.5">
        {CONTACT_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 flex-1 min-w-14 p-1.5 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] sm:text-[10px] font-medium">{label}</span>
          </a>
        ))}
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
    <div className="bg-muted rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-1 sm:min-h-0">
      <h3 className="text-xs sm:text-sm font-semibold mb-0.5">Envoyer un message</h3>
      <p className="text-[10px] text-muted-foreground mb-1.5 sm:mb-2">
        Tous les champs sont obligatoires.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-1.5 sm:flex-1" noValidate>
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
          rows={8}
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
    <div className={`flex flex-col gap-0.5 ${type === 'textarea' ? 'sm:flex-1' : ''}`}>
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
          className={`${baseClasses} resize-none sm:flex-1`}
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