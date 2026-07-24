import './Footer.scss';

const MIN_AGE = import.meta.env.VITE_MIN_AGE ?? '18';

const FOOTER_COLUMNS = [
  {
    id: 'product',
    title: 'Producto',
    links: ['Deportes', 'Apuestas en vivo', 'Promociones', 'App móvil'],
  },
  {
    id: 'company',
    title: 'Compañía',
    links: ['Sobre nosotros', 'Afiliados', 'Prensa', 'Trabaja con nosotros'],
  },
  {
    id: 'support',
    title: 'Ayuda',
    links: ['Centro de ayuda', 'Métodos de pago', 'Contacto', 'Estado del servicio'],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: ['Términos y condiciones', 'Privacidad', 'Cookies', 'Juego responsable'],
  },
];

/**
 * Footer — Pie de página con navegación secundaria y aviso de juego responsable.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo" aria-hidden="true">
              SL
            </span>
            <p className="footer__tagline">
              Apuestas deportivas con las mejores cuotas. Juega con cabeza.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav className="footer__column" key={column.id} aria-label={column.title}>
              <h3 className="footer__column-title">{column.title}</h3>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="footer__link" href="#!">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__responsible">
          <span className="footer__age" aria-label={`Solo mayores de ${MIN_AGE} años`}>
            +{MIN_AGE}
          </span>
          <p className="footer__responsible-text">
            El juego puede ser adictivo. Juega con responsabilidad y solo con dinero que puedas
            permitirte perder. Prohibido el juego a menores de {MIN_AGE} años. Si necesitas ayuda,
            contacta con tu línea de atención al jugador.
          </p>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 SportsLAB. Operador de juego con licencia. Todos los derechos reservados.
          </p>
          <p className="footer__disclaimer">
            Sitio de demostración. Las cuotas y promociones son ilustrativas.
          </p>
        </div>
      </div>
    </footer>
  );
}
