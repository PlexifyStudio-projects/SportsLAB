import './CourtScene.scss';

/**
 * CourtScene — Ilustración SVG "cinematográfica" del hero:
 * pista en perspectiva, foco de luz, red, y una pelota con estela de movimiento.
 * Puramente decorativa (aria-hidden). Escala de forma fluida con su contenedor.
 */
export default function CourtScene() {
  return (
    <div className="court-scene" aria-hidden="true">
      <svg
        className="court-scene__svg"
        viewBox="0 0 640 620"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cs-court" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#26262c" />
            <stop offset="1" stopColor="#0c0c0e" />
          </linearGradient>
          <radialGradient id="cs-spot" cx="0.5" cy="0.32" r="0.65">
            <stop offset="0" stopColor="#d8b45a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#d8b45a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cs-ball" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d891" />
            <stop offset="1" stopColor="#b28a30" />
          </linearGradient>
          <filter id="cs-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Foco de luz */}
        <ellipse cx="320" cy="210" rx="360" ry="300" fill="url(#cs-spot)" />

        {/* Sombra bajo la pista */}
        <ellipse cx="320" cy="546" rx="250" ry="34" fill="#000000" opacity="0.5" filter="url(#cs-soft)" />

        {/* Pista en perspectiva */}
        <g className="court-scene__court">
          <path d="M250 120 H390 L560 520 H80 Z" fill="url(#cs-court)" />
          {/* Líneas exteriores */}
          <path d="M250 120 H390 L560 520 H80 Z" stroke="#eaf2fb" strokeOpacity="0.85" strokeWidth="3" />
          {/* Pasillos laterales */}
          <path d="M286 120 L156 520" stroke="#eaf2fb" strokeOpacity="0.55" strokeWidth="2.5" />
          <path d="M354 120 L484 520" stroke="#eaf2fb" strokeOpacity="0.55" strokeWidth="2.5" />
          {/* Línea de saque */}
          <path d="M196 330 H444" stroke="#eaf2fb" strokeOpacity="0.7" strokeWidth="2.5" />
          {/* Marca central en T */}
          <path d="M320 330 V450" stroke="#eaf2fb" strokeOpacity="0.7" strokeWidth="2.5" />
          {/* Red */}
          <path d="M120 330 H520" stroke="#d8b45a" strokeOpacity="0.95" strokeWidth="4" />
          <path
            d="M120 330 H520"
            stroke="#eaf2fb"
            strokeOpacity="0.28"
            strokeWidth="14"
            strokeDasharray="2 7"
          />
        </g>

        {/* Estela de movimiento de la pelota */}
        <path
          className="court-scene__trail"
          d="M470 470 C 360 300, 300 250, 210 150"
          stroke="url(#cs-ball)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="1 16"
          opacity="0.85"
        />

        {/* Pelota de tenis */}
        <g className="court-scene__ball">
          <circle cx="210" cy="150" r="30" fill="url(#cs-ball)" />
          <path
            d="M188 132 c 14 12, 14 24, 0 36"
            stroke="#6b531a"
            strokeWidth="2.4"
            fill="none"
            strokeOpacity="0.75"
          />
          <path
            d="M232 132 c -14 12, -14 24, 0 36"
            stroke="#6b531a"
            strokeWidth="2.4"
            fill="none"
            strokeOpacity="0.75"
          />
          <circle cx="200" cy="140" r="8" fill="#ffffff" fillOpacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
