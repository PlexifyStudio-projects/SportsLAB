import { useEffect, useRef, useState } from 'react';

const MIN_ODD = 1.05;
const MAX_ODD = 6.0;

const clamp = (v) => Math.min(MAX_ODD, Math.max(MIN_ODD, v));
const round2 = (v) => Math.round(v * 100) / 100;

/** Avanza el marcador ("Set S · A-B") como si el partido siguiera en juego. */
function advanceScore(status) {
  const m = /Set (\d) · (\d+)-(\d+)/.exec(status);
  if (!m) return status;

  let set = Number(m[1]);
  let a = Number(m[2]);
  let b = Number(m[3]);

  if (Math.random() < 0.5) a += 1;
  else b += 1;

  // Fin de set: 6 games con 2 de diferencia (o 7). Avanza de set (máx. 3).
  if ((a >= 6 && a - b >= 2) || (b >= 6 && b - a >= 2) || a > 6 || b > 6) {
    set = Math.min(3, set + 1);
    a = 0;
    b = 0;
  }

  return `Set ${set} · ${a}-${b}`;
}

/**
 * useLiveOdds — Simula un partido en directo en el cliente (sin backend):
 * mueve las cuotas (con tendencia up/down) y hace avanzar el marcador.
 *
 * Cada tick sustituye SOLO los partidos que cambian: los demás conservan su
 * referencia de objeto, así que las `MatchCard` memoizadas no se vuelven a
 * renderizar. Sin esto, un tick repintaba las ~50 tarjetas del marquee.
 *
 * @param {import('@data/matches.js').Match[]} initial
 * @param {Object} [options]
 * @param {number} [options.interval=2400]  Milisegundos entre actualizaciones.
 * @param {boolean} [options.active=true]   Si es `false`, se detiene el reloj.
 * @returns {Array<import('@data/matches.js').Match & { trend: {home: string|null, away: string|null} }>}
 */
export function useLiveOdds(initial, { interval = 2400, active = true } = {}) {
  const baseRef = useRef(initial.map((m) => ({ home: m.odds.home, away: m.odds.away })));
  const [matches, setMatches] = useState(() =>
    initial.map((m) => ({ ...m, trend: { home: null, away: null } })),
  );

  useEffect(() => {
    // Fuera de pantalla (o pestaña en segundo plano) no simulamos nada: el
    // temporizador ni siquiera se crea.
    if (!active) return undefined;

    const id = setInterval(() => {
      setMatches((prev) =>
        prev.map((m, i) => {
          // ~55% de los partidos se mueven en cada tick.
          if (Math.random() > 0.55) {
            return m.trend.home || m.trend.away ? { ...m, trend: { home: null, away: null } } : m;
          }

          const base = baseRef.current[i];
          const delta = (Math.random() - 0.5) * 0.14;
          const home = round2(clamp(m.odds.home + delta + (base.home - m.odds.home) * 0.15));
          const away = round2(clamp(m.odds.away - delta * 0.6 + (base.away - m.odds.away) * 0.15));

          // A veces también avanza el marcador.
          const status = Math.random() < 0.4 ? advanceScore(m.status) : m.status;

          return {
            ...m,
            odds: { home, away },
            status,
            trend: {
              home: home > m.odds.home ? 'up' : home < m.odds.home ? 'down' : null,
              away: away > m.odds.away ? 'up' : away < m.odds.away ? 'down' : null,
            },
          };
        }),
      );
    }, interval);

    return () => clearInterval(id);
  }, [interval, active]);

  return matches;
}
