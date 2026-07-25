import { useEffect, useRef } from 'react';

import Icon from '@components/ui/Icon/Icon.jsx';
import { LEGAL_UPDATED } from '@data/legal.js';
import './LegalModal.scss';

/**
 * LegalModal — Ventana modal accesible para los documentos legales.
 *
 * Accesibilidad: rol `dialog` modal, foco atrapado dentro mientras está abierto,
 * cierre con Escape o clic en el fondo, y devolución del foco al elemento que
 * lo abrió. El scroll de la página queda bloqueado mientras está abierta.
 *
 * @param {Object} props
 * @param {import('@data/legal.js').LegalDoc|null} props.doc  Documento a mostrar.
 * @param {() => void} props.onClose
 * @param {string} props.closeLabel   Texto accesible del botón de cierre.
 * @param {string} props.updatedLabel Etiqueta de "última actualización".
 */
export default function LegalModal({ doc, onClose, closeLabel, updatedLabel }) {
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!doc) return undefined;

    // Recuerda quién abrió el modal para devolverle el foco al cerrar.
    openerRef.current = document.activeElement;

    const panel = panelRef.current;
    panel?.focus();

    // Bloquea el scroll de fondo compensando el ancho de la barra para que la
    // página no dé un salto lateral al abrirse.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      // Foco atrapado: el tabulador da la vuelta dentro del modal.
      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      openerRef.current?.focus?.();
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div className="legal-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="legal-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="legal-modal__head">
          <div>
            <h2 className="legal-modal__title" id="legal-modal-title">
              {doc.title}
            </h2>
            <p className="legal-modal__updated">
              {updatedLabel} {LEGAL_UPDATED}
            </p>
          </div>
          <button
            className="legal-modal__close"
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <Icon name="close" size={22} />
          </button>
        </header>

        <div className="legal-modal__body">
          <p className="legal-modal__intro">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section className="legal-modal__section" key={section.heading}>
              <h3 className="legal-modal__heading">{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p className="legal-modal__text" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
