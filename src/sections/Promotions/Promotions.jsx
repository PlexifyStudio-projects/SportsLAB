import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Badge from '@components/ui/Badge/Badge.jsx';
import Button from '@components/ui/Button/Button.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';
import { PROMOTIONS } from '@data/promotions.js';
import './Promotions.scss';

/**
 * Promotions — Bonos y promociones activas.
 */
export default function Promotions() {
  return (
    <section className="promotions" id="promociones">
      <div className="container">
        <SectionHeader
          eyebrow="Promociones"
          title="Bonos que multiplican tu juego"
          subtitle="Aprovecha nuestras promociones. Todas sujetas a términos y condiciones."
        />

        <div className="promotions__grid">
          {PROMOTIONS.map((promo, i) => (
            <Reveal
              key={promo.id}
              variant="scale"
              delay={i * 100}
              className={`promotions__card ${
                promo.featured ? 'promotions__card--featured' : ''
              }`}
            >
              <Badge variant={promo.featured ? 'accent' : 'neutral'}>{promo.tag}</Badge>
              <h3 className="promotions__card-title">{promo.title}</h3>
              <p className="promotions__card-desc">{promo.description}</p>
              <Button
                as="a"
                href="#registro"
                variant={promo.featured ? 'primary' : 'secondary'}
                fullWidth
              >
                {promo.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
