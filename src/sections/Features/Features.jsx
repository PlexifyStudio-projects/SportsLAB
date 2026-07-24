import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Icon from '@components/ui/Icon/Icon.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';
import { FEATURES } from '@data/features.js';
import './Features.scss';

/**
 * Features — Ventajas competitivas de SportsLAB.
 */
export default function Features() {
  return (
    <section className="features" id="ventajas">
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow="Por qué SportsLAB"
          title="La plataforma pensada para el apostante"
          subtitle="Rápida, segura y con las mejores cuotas del mercado."
        />

        <ul className="features__grid">
          {FEATURES.map((feature, i) => (
            <Reveal as="li" className="features__card" key={feature.id} delay={i * 90}>
              <span className="features__icon">
                <Icon name={feature.icon} size={26} />
              </span>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
