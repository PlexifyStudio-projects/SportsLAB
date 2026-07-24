import SectionHeader from '@components/ui/SectionHeader/SectionHeader.jsx';
import Reveal from '@components/ui/Reveal/Reveal.jsx';

import portrait from '@assets/images/2.jpeg';
import night from '@assets/images/1.jpeg';
import patrol from '@assets/images/4.jpeg';
import drive from '@assets/images/3.jpeg';
import wheel from '@assets/images/5.jpeg';

import './Lifestyle.scss';

/**
 * Lifestyle — Sección aspiracional / "detrás de SportsLAB".
 * Muestra las fotos del fundador con un tratamiento editorial negro/oro.
 */
export default function Lifestyle() {
  return (
    <section className="lifestyle" id="estilo">
      <div className="container">
        <SectionHeader
          eyebrow="Estilo de vida"
          title="Más que apuestas: mentalidad de ganador"
          subtitle="Detrás de SportsLAB hay apostadores de verdad. Disciplina, análisis y cabeza fría, dentro y fuera de la pista."
        />

        <Reveal className="lifestyle__collage" variant="fade">
          <figure className="lifestyle__figure lifestyle__figure--feature">
            <img src={portrait} alt="Fundador de SportsLAB" loading="lazy" />
            <figcaption className="lifestyle__caption">
              <span className="lifestyle__caption-name">El Fundador</span>
              <span className="lifestyle__caption-role">SportsLAB</span>
            </figcaption>
          </figure>

          <figure className="lifestyle__figure">
            <img src={night} alt="Trabajando de noche" loading="lazy" />
          </figure>
          <figure className="lifestyle__figure">
            <img src={patrol} alt="Noche de ciudad" loading="lazy" />
          </figure>
          <figure className="lifestyle__figure">
            <img src={drive} alt="En movimiento" loading="lazy" />
          </figure>
          <figure className="lifestyle__figure">
            <img src={wheel} alt="Al volante" loading="lazy" />
          </figure>
        </Reveal>

        <Reveal className="lifestyle__quote" as="blockquote" variant="up" delay={120}>
          <p className="lifestyle__quote-text">
            “En la pista y en la vida gana quien estudia el juego. Nosotros te damos las
            herramientas; las decisiones, con cabeza.”
          </p>
          <cite className="lifestyle__quote-cite">— Equipo SportsLAB</cite>
        </Reveal>
      </div>
    </section>
  );
}
