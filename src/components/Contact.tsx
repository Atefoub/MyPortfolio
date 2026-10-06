import { useState, type FormEvent, type ChangeEvent } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Send,
  CheckCircle,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { FORMSPREE_ENDPOINT, CV_PATH } from '../lib/constants';
import { useFormSubmit } from '../lib/hooks';
import SectionHeader from './SectionHeader';

const CONTACT_LINKS: ReadonlyArray<{
  icon: typeof Github;
  href: string;
  label: string;
  download?: string;
}> = [
  { icon: Github,   href: 'https://github.com/Atefoub',                            label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/antoine-mourin-0033ab233/', label: 'LinkedIn' },
  { icon: FileText, href: CV_PATH,                                                  label: 'CV', download: 'CV_Antoine_Mourin.pdf' },
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
    <section className="contact-section px-5 sm:px-8 lg:px-16" id="contact">
      <div className="contact-page">
        <SectionHeader
          index="04 — Contact"
          title="Écrire"
          lede="Un message suffit. Je réponds."
        />

        <p className="contact-status">
          <span className="status-dot-wrap" aria-hidden="true">
            <span className="status-ping status-ping-green" />
            <span className="status-dot status-dot-green" />
          </span>
          Disponible pour une alternance RNCP 7 ou un premier poste junior. Nantes, Ancenis, Angers.
        </p>

        <div className="contact-grid">
          <ContactInfo />
          <ContactForm
            formData={formData}
            status={status}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>

        <footer className="contact-footer">
          © {new Date().getFullYear()} Antoine Mourin
        </footer>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div className="contact-panel">
      <p className="contact-panel-label">Coordonnées</p>

      <a href="mailto:antoinem1pro@gmail.com" className="contact-row">
        <span className="contact-row-icon"><Mail className="w-4 h-4" /></span>
        <span>
          <span className="contact-row-k">Email</span>
          <span className="contact-row-v">antoinem1pro@gmail.com</span>
        </span>
      </a>

      <a href="tel:+33613036351" className="contact-row">
        <span className="contact-row-icon"><Phone className="w-4 h-4" /></span>
        <span>
          <span className="contact-row-k">Téléphone</span>
          <span className="contact-row-v">06 13 03 63 51</span>
        </span>
      </a>

      <div className="contact-row">
        <span className="contact-row-icon"><MapPin className="w-4 h-4" /></span>
        <span>
          <span className="contact-row-k">Localisation</span>
          <span className="contact-row-v">Anetz (44150)</span>
        </span>
      </div>

      <div className="contact-row">
        <span className="contact-row-icon"><Navigation className="w-4 h-4" /></span>
        <span>
          <span className="contact-row-k">Mobilité</span>
          <span className="contact-row-v">Nantes · Ancenis · Angers</span>
        </span>
      </div>

      <div className="contact-socials">
        {CONTACT_LINKS.map(({ icon: Icon, href, label, download }) => (
          <a
            key={label}
            href={href}
            {...(download
              ? { download }
              : { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={label}
            title={label}
          >
            <Icon className="w-5 h-5" />
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
      <div className="contact-panel items-center justify-center text-center min-h-64">
        <CheckCircle className="w-10 h-10 text-accent" />
        <p className="text-lg font-semibold">Message envoyé.</p>
        <p className="text-sm text-muted-foreground">Je vous réponds dès que possible.</p>
      </div>
    );
  }

  return (
    <form className="contact-panel" onSubmit={onSubmit} noValidate>
      <p className="contact-panel-label">Message</p>
      <FormField id="name" label="Nom" type="text" value={formData.name} onChange={onChange} disabled={status === 'sending'} />
      <FormField id="email" label="Email" type="email" value={formData.email} onChange={onChange} disabled={status === 'sending'} placeholder="vous@exemple.com" />
      <FormField id="message" label="Message" type="textarea" value={formData.message} onChange={onChange} disabled={status === 'sending'} placeholder="Le poste, le contexte, le timing." rows={6} />

      {status === 'error' && (
        <p className="text-sm text-red-500">Une erreur est survenue. Réessayez, ou écrivez-moi directement.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-sm text-sm font-semibold hover:bg-sage hover:text-white disabled:opacity-50 transition-colors"
      >
        {status === 'sending' ? (
          <>
            <span className="inline-block w-3.5 h-3.5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Envoyer
          </>
        )}
      </button>
    </form>
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
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label}</label>
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
        />
      )}
    </div>
  );
}
