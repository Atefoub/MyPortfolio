import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, FileText, Send, CheckCircle, Calendar, Briefcase } from 'lucide-react';

export default function Contact() {
  // ─── État du formulaire Formspree ────────────────────────────
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xvzknqwk', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Retour à l'état initial après 4s
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="pt-20 pb-2 px-4 md:px-8 lg:px-16" id="contact">
      <div className="max-w-5xl mx-auto w-full">

        {/* ── Titre de section ─────────────────────────────────── */}
        <div className="mb-6 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* ── Accroche ─────────────────────────────────────────── */}
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed mb-4 animate-slide-up animation-delay-200">
          Vous avez un projet en tête, une opportunité de stage ou d'alternance ? 
          N'hésitez pas à me contacter !
        </p>

        {/* ── Badges de disponibilité ──────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 animate-slide-up animation-delay-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-500/20">
            <Calendar className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs font-semibold">Stage - 2 mois</div>
              <div className="text-[10px] opacity-80">Disponible à partir de juin 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/20">
            <Briefcase className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs font-semibold">Alternance - 24 mois</div>
              <div className="text-[10px] opacity-80">Dès septembre 2026 (RNCP niveau 7)</div>
            </div>
          </div>
        </div>

        {/* ── Grille principale : Infos | Formulaire ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch animate-slide-up animation-delay-400">

          {/* ── Colonne gauche : email + liens sociaux ────────── */}
          <div className="flex flex-col gap-3 bg-muted rounded-xl p-4 justify-center">

            {/* Email principal */}
            <div>
              <a
                href="mailto:antoinem1pro@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full font-medium hover:scale-105 transition-transform duration-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                antoinem1pro@gmail.com
              </a>
            </div>

            {/* Localisation */}
            <div className="flex items-start gap-2 px-3 py-2 text-muted-foreground">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="font-medium text-foreground text-sm">Anetz (44150)</div>
                <div className="text-xs">Région Pays de la Loire</div>
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-border my-1"></div>

            {/* Liens sociaux - CORRECTION: remplacer min-w-[70px] par w-20 */}
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/Atefoub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 flex-1 w-20 p-3 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="text-[10px] font-medium">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/antoine-mourin-0033ab233/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 flex-1 w-20 p-3 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-[10px] font-medium">LinkedIn</span>
              </a>

              <a
                href="public\images\projects\CV - Antoine Mourin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 flex-1 w-20 p-3 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-medium">CV</span>
              </a>
            </div>
          </div>

          {/* ── Colonne droite : formulaire Formspree ──────────── */}
          <div className="bg-muted rounded-xl p-4 flex flex-col">

            <h3 className="text-base font-semibold mb-1">Envoyer un message</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Tous les champs sont obligatoires.
            </p>

            {/* ── État "succès" ─────────────────────────────── */}
            {status === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-lg font-semibold">Message envoyé !</p>
                <p className="text-sm text-muted-foreground">
                  Je vous répondrai dans les meilleurs délais.
                </p>
              </div>
            ) : (
              /* ── Formulaire ─────────────────────────────────── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1" noValidate>

                {/* Nom */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs font-medium">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="px-3 py-2 rounded-lg bg-background border border-border text-xs placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 transition-shadow duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-medium">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="px-3 py-2 rounded-lg bg-background border border-border text-xs placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 transition-shadow duration-200"
                  />
                </div>

                {/* Message — flex-1 pour remplir l'espace restant */}
                <div className="flex flex-col gap-1 flex-1">
                  <label htmlFor="message" className="text-xs font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Parlez-moi de votre projet, opportunité de stage ou d'alternance..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    disabled={status === 'sending'}
                    className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-xs placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 transition-shadow duration-200 resize-none"
                  />
                </div>

                {/* Message d'erreur */}
                {status === 'error' && (
                  <p className="text-sm text-red-500">
                    Une erreur est survenue. Veuillez réessayer.
                  </p>
                )}

                {/* Bouton envoi */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="self-start mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs font-medium hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></span>
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
            )}
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="mt-4 pt-4 border-t border-border text-center text-muted-foreground">
          <p className="text-xs">&copy; {new Date().getFullYear()} Antoine Mourin. Tous droits réservés.</p>
        </div>
      </div>
    </section>
  );
}