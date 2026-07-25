// =============================================================================
// DATA · Textos legales (ES / EN)
// =============================================================================
// Se muestran en modales desde el footer (no son rutas nuevas: el sitio es una
// única página desplegada en GitHub Pages).
//
// IMPORTANTE — pendiente del cliente: los campos marcados con «[…]» deben
// rellenarse con los datos reales de la empresa (razón social, NIT, domicilio)
// y el conjunto debería pasar revisión de un abogado antes de publicarse.
// Las apuestas en Colombia están reguladas por Coljuegos.
// =============================================================================

/** Correo de contacto público del servicio. */
export const CONTACT_EMAIL = 'jhonbarrioscuevas@gmail.com';

/** Fecha de última actualización de los documentos legales. */
export const LEGAL_UPDATED = '2026-07-25';

/**
 * @typedef {Object} LegalSection
 * @property {string} heading
 * @property {string[]} body   Párrafos.
 */

/**
 * @typedef {Object} LegalDoc
 * @property {string} title
 * @property {string} intro
 * @property {LegalSection[]} sections
 */

/** @type {Record<'ES'|'EN', Record<string, LegalDoc>>} */
export const LEGAL = {
  ES: {
    terms: {
      title: 'Términos y condiciones',
      intro:
        'Al acceder a este sitio y al canal de Telegram de AbrahamSportsLAB aceptas estas condiciones. Si no estás de acuerdo con alguna de ellas, no utilices el servicio.',
      sections: [
        {
          heading: '1. Qué es AbrahamSportsLAB',
          body: [
            'AbrahamSportsLAB es un servicio de información y análisis deportivo. Publicamos pronósticos ("picks") sobre partidos de tenis de los circuitos ATP, WTA, Grand Slams, Masters 1000 y Challengers, junto con el análisis que los sustenta y una cuota de referencia.',
            'AbrahamSportsLAB NO es una casa de apuestas, no acepta depósitos, no gestiona dinero de los usuarios y no tramita apuestas en nombre de nadie. Cualquier apuesta la realizas tú, por tu cuenta y riesgo, en el operador que elijas.',
          ],
        },
        {
          heading: '2. Edad mínima y territorio',
          body: [
            'El servicio está dirigido exclusivamente a mayores de 18 años. Al usarlo declaras que cumples ese requisito.',
            'Las apuestas deportivas están reguladas en Colombia por Coljuegos y solo son legales a través de operadores con licencia vigente. Es tu responsabilidad comprobar que apostar es legal en tu lugar de residencia.',
          ],
        },
        {
          heading: '3. Ausencia de garantía de resultados',
          body: [
            'Ningún pronóstico garantiza ganancias. Los porcentajes de efectividad que publicamos son un registro histórico y no predicen resultados futuros.',
            'Las decisiones que tomes a partir de nuestra información son tuyas. AbrahamSportsLAB no se responsabiliza de pérdidas económicas derivadas del uso del servicio.',
          ],
        },
        {
          heading: '4. Cuotas y datos mostrados',
          body: [
            'Las cuotas y marcadores que aparecen en este sitio tienen carácter ilustrativo y pueden no coincidir con las de tu operador en el momento de apostar. Verifica siempre la cuota real antes de confirmar una apuesta.',
          ],
        },
        {
          heading: '5. Uso permitido',
          body: [
            'Los pronósticos y análisis son para tu uso personal. No está permitido revenderlos, redistribuirlos ni republicarlos, total o parcialmente, sin autorización escrita.',
            'Nos reservamos el derecho de restringir el acceso al canal a quien incumpla estas condiciones o altere la convivencia de la comunidad.',
          ],
        },
        {
          heading: '6. Cambios en las condiciones',
          body: [
            'Podemos actualizar estas condiciones. La versión vigente es siempre la publicada en esta página, con su fecha de actualización.',
          ],
        },
        {
          heading: '7. Contacto',
          body: [`Para cualquier consulta sobre estas condiciones, escríbenos a ${CONTACT_EMAIL}.`],
        },
      ],
    },

    privacy: {
      title: 'Política de privacidad',
      intro:
        'Explicamos qué datos tratamos, para qué y qué derechos tienes sobre ellos. Tratamiento conforme a la Ley 1581 de 2012 de protección de datos personales de Colombia.',
      sections: [
        {
          heading: '1. Qué datos recogemos',
          body: [
            'Este sitio web es una página informativa: no tiene formularios de registro, no pide datos personales y no crea cuentas de usuario.',
            'Si nos escribes por correo electrónico, tratamos tu dirección y el contenido del mensaje con la única finalidad de responderte.',
            'Si te unes al canal de Telegram, los datos que Telegram muestre de tu perfil (nombre de usuario, foto) se rigen por la política de privacidad de Telegram, no por la nuestra.',
          ],
        },
        {
          heading: '2. Para qué los usamos',
          body: [
            'Únicamente para atender tus consultas y para prestar el servicio de pronósticos. No elaboramos perfiles comerciales ni tomamos decisiones automatizadas sobre ti.',
          ],
        },
        {
          heading: '3. Con quién los compartimos',
          body: [
            'No vendemos ni cedemos datos personales a terceros. Los únicos terceros implicados son los proveedores de infraestructura necesarios para que el sitio funcione (alojamiento) y Telegram como canal de comunicación.',
          ],
        },
        {
          heading: '4. Cuánto tiempo los conservamos',
          body: [
            'Los correos se conservan mientras dure la relación y el tiempo necesario para atender posibles reclamaciones. Después se eliminan.',
          ],
        },
        {
          heading: '5. Tus derechos',
          body: [
            'Puedes solicitar acceso, rectificación, actualización o supresión de tus datos, así como revocar tu autorización, escribiendo a ' +
              CONTACT_EMAIL +
              '.',
            'Responderemos a tu solicitud en los plazos previstos por la normativa aplicable.',
          ],
        },
      ],
    },

    cookies: {
      title: 'Política de cookies',
      intro: 'Qué se guarda en tu navegador cuando visitas este sitio.',
      sections: [
        {
          heading: '1. No usamos cookies de seguimiento',
          body: [
            'Este sitio no instala cookies publicitarias, ni de analítica de terceros, ni píxeles de seguimiento. No compartimos tu navegación con redes sociales ni con plataformas de publicidad.',
          ],
        },
        {
          heading: '2. Almacenamiento local estrictamente necesario',
          body: [
            'Guardamos un único dato en el almacenamiento local (localStorage) de tu navegador: el idioma que has elegido (clave "lang"), para no volver a preguntártelo en cada visita.',
            'No es una cookie, no se envía a ningún servidor y no permite identificarte.',
          ],
        },
        {
          heading: '3. Cómo eliminarlo',
          body: [
            'Puedes borrarlo en cualquier momento desde las opciones de tu navegador ("Borrar datos de navegación" → "Cookies y datos de sitios"). Al hacerlo, el sitio volverá a mostrarse en español por defecto.',
          ],
        },
      ],
    },

    responsible: {
      title: 'Juego responsable',
      intro:
        'Apostar debe ser entretenimiento, nunca una forma de conseguir ingresos ni de recuperar pérdidas.',
      sections: [
        {
          heading: 'Reglas básicas',
          body: [
            'Apuesta solo dinero que puedas permitirte perder. Nunca dinero destinado a gastos esenciales ni dinero prestado.',
            'Fija un presupuesto mensual antes de empezar y no lo superes bajo ningún concepto.',
            'No persigas las pérdidas: aumentar la apuesta para recuperar lo perdido es el error más caro y más común.',
            'No apuestes bajo los efectos del alcohol, ni en momentos de estrés o de euforia.',
            'Marca límites de tiempo. Si el juego desplaza a tu trabajo, tu descanso o tu gente, es una señal de alarma.',
          ],
        },
        {
          heading: 'Señales de alerta',
          body: [
            'Pensar en apostar de forma constante, mentir sobre cuánto juegas, pedir dinero prestado para apostar, o sentir ansiedad cuando no puedes hacerlo.',
            'Si te reconoces en alguna de estas señales, para y busca ayuda. No es una cuestión de fuerza de voluntad.',
          ],
        },
        {
          heading: 'Dónde pedir ayuda',
          body: [
            'En Colombia, Coljuegos (entidad reguladora del juego) informa sobre juego responsable y sobre los operadores con licencia legal: www.coljuegos.gov.co',
            'Jugadores Anónimos ofrece grupos de apoyo gratuitos y confidenciales.',
            'La mayoría de operadores con licencia permiten fijar límites de depósito y solicitar la autoexclusión. Úsalos: están para eso.',
          ],
        },
        {
          heading: 'Nuestro compromiso',
          body: [
            'AbrahamSportsLAB no publica pronósticos dirigidos a menores de 18 años, no promete ganancias garantizadas y no anima a recuperar pérdidas. Si nos pides que dejemos de enviarte contenido, lo hacemos sin preguntar.',
          ],
        },
      ],
    },
  },

  EN: {
    terms: {
      title: 'Terms & conditions',
      intro:
        'By accessing this site and the AbrahamSportsLAB Telegram channel you accept these terms. If you disagree with any of them, do not use the service.',
      sections: [
        {
          heading: '1. What AbrahamSportsLAB is',
          body: [
            'AbrahamSportsLAB is a sports information and analysis service. We publish tips on ATP, WTA, Grand Slam, Masters 1000 and Challenger tennis matches, along with the analysis behind them and a reference odd.',
            'AbrahamSportsLAB is NOT a bookmaker. We do not accept deposits, do not handle user funds and do not place bets on anyone’s behalf. Any bet you place is yours, at your own risk, with the operator you choose.',
          ],
        },
        {
          heading: '2. Minimum age and territory',
          body: [
            'The service is intended exclusively for people aged 18 or over. By using it you confirm that you meet this requirement.',
            'Sports betting in Colombia is regulated by Coljuegos and is only legal through licensed operators. It is your responsibility to check that betting is legal where you live.',
          ],
        },
        {
          heading: '3. No guaranteed results',
          body: [
            'No tip guarantees a profit. The hit rates we publish are a historical record and do not predict future results.',
            'Any decision you make based on our information is yours. AbrahamSportsLAB is not liable for financial losses arising from use of the service.',
          ],
        },
        {
          heading: '4. Odds and displayed data',
          body: [
            'Odds and scores shown on this site are illustrative and may not match your operator’s at the time of betting. Always check the real odd before confirming a bet.',
          ],
        },
        {
          heading: '5. Permitted use',
          body: [
            'Tips and analysis are for your personal use. Reselling, redistributing or republishing them, in whole or in part, without written permission is not allowed.',
            'We reserve the right to restrict channel access to anyone who breaches these terms or disrupts the community.',
          ],
        },
        {
          heading: '6. Changes to these terms',
          body: [
            'We may update these terms. The version in force is always the one published on this page, with its update date.',
          ],
        },
        {
          heading: '7. Contact',
          body: [`For any question about these terms, write to us at ${CONTACT_EMAIL}.`],
        },
      ],
    },

    privacy: {
      title: 'Privacy policy',
      intro:
        'What data we process, what for, and what rights you have over it. Processing complies with Colombian data protection law (Law 1581 of 2012).',
      sections: [
        {
          heading: '1. What we collect',
          body: [
            'This website is informational: it has no sign-up forms, asks for no personal data and creates no user accounts.',
            'If you email us, we process your address and the content of your message for the sole purpose of replying to you.',
            'If you join the Telegram channel, whatever Telegram shows from your profile (username, photo) is governed by Telegram’s privacy policy, not ours.',
          ],
        },
        {
          heading: '2. What we use it for',
          body: [
            'Only to answer your enquiries and to provide the tipping service. We do not build commercial profiles or make automated decisions about you.',
          ],
        },
        {
          heading: '3. Who we share it with',
          body: [
            'We do not sell or transfer personal data to third parties. The only third parties involved are the infrastructure providers needed to run the site (hosting) and Telegram as a communication channel.',
          ],
        },
        {
          heading: '4. How long we keep it',
          body: [
            'Emails are kept for the duration of the relationship and as long as needed to handle possible claims. They are deleted afterwards.',
          ],
        },
        {
          heading: '5. Your rights',
          body: [
            `You can request access, rectification, update or deletion of your data, and withdraw your consent, by writing to ${CONTACT_EMAIL}.`,
            'We will respond within the timeframes set by applicable law.',
          ],
        },
      ],
    },

    cookies: {
      title: 'Cookie policy',
      intro: 'What gets stored in your browser when you visit this site.',
      sections: [
        {
          heading: '1. We use no tracking cookies',
          body: [
            'This site sets no advertising cookies, no third-party analytics and no tracking pixels. We do not share your browsing with social networks or ad platforms.',
          ],
        },
        {
          heading: '2. Strictly necessary local storage',
          body: [
            'We store a single item in your browser’s localStorage: the language you picked (key "lang"), so we do not have to ask again on every visit.',
            'It is not a cookie, it is never sent to any server and it cannot identify you.',
          ],
        },
        {
          heading: '3. How to remove it',
          body: [
            'You can clear it at any time from your browser settings ("Clear browsing data" → "Cookies and site data"). The site will then default back to Spanish.',
          ],
        },
      ],
    },

    responsible: {
      title: 'Responsible gaming',
      intro:
        'Betting should be entertainment — never a way to make an income or to win back losses.',
      sections: [
        {
          heading: 'Ground rules',
          body: [
            'Only bet money you can afford to lose. Never money meant for essentials, and never borrowed money.',
            'Set a monthly budget before you start and do not exceed it under any circumstances.',
            'Do not chase losses. Raising your stake to win back what you lost is the most expensive and most common mistake there is.',
            'Do not bet under the influence of alcohol, or while stressed or on a high.',
            'Set time limits. If betting starts displacing your work, your sleep or your people, that is a warning sign.',
          ],
        },
        {
          heading: 'Warning signs',
          body: [
            'Thinking about betting constantly, lying about how much you play, borrowing money to bet, or feeling anxious when you cannot.',
            'If you recognise yourself in any of these, stop and seek help. This is not a matter of willpower.',
          ],
        },
        {
          heading: 'Where to get help',
          body: [
            'In Colombia, Coljuegos (the gambling regulator) provides information on responsible gaming and on legally licensed operators: www.coljuegos.gov.co',
            'Gamblers Anonymous runs free, confidential support groups.',
            'Most licensed operators let you set deposit limits and request self-exclusion. Use them — that is what they are for.',
          ],
        },
        {
          heading: 'Our commitment',
          body: [
            'AbrahamSportsLAB does not target tips at anyone under 18, does not promise guaranteed profits and does not encourage chasing losses. If you ask us to stop sending you content, we do so without question.',
          ],
        },
      ],
    },
  },
};
