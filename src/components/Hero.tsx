import { ANIMATION_DELAYS } from '../lib/constants';
import { useViewNavigate } from '../lib/motion';
import { assetPath } from '../lib/utils';
import AsciiPortrait from './AsciiPortrait';
import Button from './Button';
import SocialLinks from './SocialLinks';

export default function Hero() {
  const navigate = useViewNavigate();

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        <div className="animate-fade-in">
          <p className="hero-kicker">
            <span className="hero-kicker-mark" aria-hidden="true" />
            Nantes · Développeur full-stack
          </p>
          <h1 className="hero-title">
            <span>Antoine</span>
            <span>Mourin</span>
          </h1>
          <p className={`hero-lead animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
            Douze ans de comptabilité m'ont appris à finir ce que je commence.
            J'en fais des outils qui enlèvent le travail répétitif.
          </p>
          <p className={`hero-meta animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
            Titulaire du CDA (RNCP 6), Ada Tech School. Je cherche une alternance RNCP 7
            ou un premier poste junior, entre Nantes, Ancenis et Angers.
          </p>
          <p className="hero-siteswap" title="531, la notation siteswap d'un jonglage à trois balles">
            <span>siteswap</span>
            531
          </p>
          <div className={`hero-cta animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
            <Button variant="primary" size="lg" onClick={() => navigate('/projets')}>
              Voir les projets
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Me contacter
            </Button>
            <SocialLinks size="md" />
          </div>
        </div>

        <div className="hero-plate animate-fade-in">
          <AsciiPortrait src={assetPath('images/hero.jpg')} alt="Antoine Mourin" />
          <div className="hero-plate-scan" aria-hidden="true" />
          <p className="hero-plate-caption">Portrait en code — survolez</p>
        </div>
      </div>
    </section>
  );
}
