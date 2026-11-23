// Popup language follows the browser, independently of location.
const POPUP_TRANSLATIONS = {
  "en": {
    "sale": "THE BIG SALE",
    "eyebrow": "A little cart. A lot of possibilities.",
    "upto": "UP TO",
    "off": "OFF",
    "intro1": "Big finds. Small prices.",
    "intro2": "Your next favourite deal is waiting.",
    "deal": "Your next deal is waiting.",
    "detail": "Explore today’s offers and find your favourites.",
    "cta": "DISCOVER TODAY’S DEALS",
    "terms": "Selected items. Offer terms and availability apply.",
    "pending": "Preview · Offer link pending"
  },
  "fr": {
    "sale": "LES GRANDES PROMOS",
    "eyebrow": "Un petit panier. De grandes possibilités.",
    "upto": "JUSQU’À",
    "off": "DE RÉDUCTION",
    "intro1": "De belles trouvailles. Des petits prix.",
    "intro2": "Votre prochaine bonne affaire vous attend.",
    "deal": "Votre prochaine bonne affaire vous attend.",
    "detail": "Explorez les offres du jour et trouvez vos coups de cœur.",
    "cta": "DÉCOUVRIR LES OFFRES DU JOUR",
    "terms": "Sur une sélection d’articles. Selon conditions et disponibilités.",
    "pending": "Aperçu · Lien de l’offre à venir"
  },
  "es": {
    "sale": "GRANDES OFERTAS",
    "eyebrow": "Un pequeño carrito. Muchas posibilidades.",
    "upto": "HASTA",
    "off": "DE DESCUENTO",
    "intro1": "Grandes hallazgos. Precios pequeños.",
    "intro2": "Tu próxima oferta favorita te espera.",
    "deal": "Tu próxima oferta te espera.",
    "detail": "Explora las ofertas de hoy y encuentra tus favoritos.",
    "cta": "DESCUBRE LAS OFERTAS DE HOY",
    "terms": "En artículos seleccionados. Sujeto a condiciones y disponibilidad.",
    "pending": "Vista previa · Enlace de la oferta pendiente"
  },
  "pt": {
    "sale": "GRANDES OFERTAS",
    "eyebrow": "Um carrinho pequeno. Muitas possibilidades.",
    "upto": "ATÉ",
    "off": "DE DESCONTO",
    "intro1": "Grandes achados. Pequenos preços.",
    "intro2": "Sua próxima oferta favorita está esperando.",
    "deal": "Sua próxima oferta está esperando.",
    "detail": "Explore as ofertas de hoje e encontre seus favoritos.",
    "cta": "DESCUBRA AS OFERTAS DE HOJE",
    "terms": "Em itens selecionados. Sujeito a condições e disponibilidade.",
    "pending": "Prévia · Link da oferta pendente"
  },
  "de": {
    "sale": "DIE GROSSE AKTION",
    "eyebrow": "Kleiner Warenkorb. Viele Möglichkeiten.",
    "upto": "BIS ZU",
    "off": "RABATT",
    "intro1": "Tolle Fundstücke. Kleine Preise.",
    "intro2": "Dein nächstes Lieblingsangebot wartet auf dich.",
    "deal": "Dein nächstes Angebot wartet auf dich.",
    "detail": "Entdecke die heutigen Angebote und finde deine Favoriten.",
    "cta": "HEUTIGE ANGEBOTE ENTDECKEN",
    "terms": "Für ausgewählte Artikel. Bedingungen und Verfügbarkeit gelten.",
    "pending": "Vorschau · Angebotslink noch nicht verfügbar"
  },
  "ar": {
    "sale": "عروض كبرى",
    "eyebrow": "سلة صغيرة. خيارات كثيرة.",
    "upto": "حتى",
    "off": "خصم",
    "intro1": "منتجات مميزة. أسعار صغيرة.",
    "intro2": "عرضك المفضل القادم بانتظارك.",
    "deal": "عرضك القادم بانتظارك.",
    "detail": "اكتشف عروض اليوم واعثر على منتجاتك المفضلة.",
    "cta": "اكتشف عروض اليوم",
    "terms": "على منتجات مختارة. تطبق شروط العرض وحسب التوفر.",
    "pending": "معاينة · رابط العرض غير متوفر بعد"
  }
};
function selectPopupLanguage(language) {
  const base = String(language || 'en').toLowerCase().split(/[-_]/)[0];
  return Object.prototype.hasOwnProperty.call(POPUP_TRANSLATIONS, base) ? base : 'en';
}
const popupLanguage = selectPopupLanguage(navigator.languages?.[0] || navigator.language);
const popup = document.querySelector('.sale-card');
popup.lang = popupLanguage === 'pt' ? 'pt-BR' : popupLanguage;
popup.dir = popupLanguage === 'ar' ? 'rtl' : 'ltr';
popup.querySelectorAll('[data-i18n]').forEach(element => {
  element.textContent = POPUP_TRANSLATIONS[popupLanguage][element.dataset.i18n];
});

const motion = document.querySelector('.motion');
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
  motion.textContent = paused ? '▶' : 'Ⅱ';
});
document.querySelector('.search').addEventListener('submit', event => event.preventDefault());

// Real verification is available only on Cloudflare Pages with its Function.
const HUMAN_TEXT = {
  en: ['Human verification', 'Complete the security check to continue.', 'Checking…', 'Verification successful. You can now open the offer.', 'Verification failed. Please try again.', 'Continue to the offer', 'Try again', 'Close', 'Offer temporarily unavailable.'],
  fr: ['Vérification humaine', 'Effectuez la vérification pour continuer.', 'Vérification en cours…', 'Vérification réussie. Vous pouvez ouvrir l’offre.', 'La vérification a échoué. Réessayez.', 'Continuer vers l’offre', 'Réessayer', 'Fermer', 'Offre temporairement indisponible.'],
  es: ['Verificación humana', 'Completa la verificación para continuar.', 'Verificando…', 'Verificación correcta. Ya puedes abrir la oferta.', 'La verificación falló. Inténtalo de nuevo.', 'Continuar a la oferta', 'Reintentar', 'Cerrar', 'Oferta temporalmente no disponible.'],
  pt: ['Verificação humana', 'Conclua a verificação para continuar.', 'Verificando…', 'Verificação concluída. Você pode abrir a oferta.', 'A verificação falhou. Tente novamente.', 'Continuar para a oferta', 'Tentar novamente', 'Fechar', 'Oferta temporariamente indisponível.'],
  de: ['Sicherheitsprüfung', 'Schließe die Sicherheitsprüfung ab, um fortzufahren.', 'Wird geprüft…', 'Prüfung erfolgreich. Du kannst das Angebot jetzt öffnen.', 'Die Prüfung ist fehlgeschlagen. Bitte versuche es erneut.', 'Weiter zum Angebot', 'Erneut versuchen', 'Schließen', 'Angebot vorübergehend nicht verfügbar.'],
  ar: ['التحقق البشري', 'أكمل التحقق الأمني للمتابعة.', 'جارٍ التحقق…', 'تم التحقق بنجاح. يمكنك فتح العرض الآن.', 'فشل التحقق. يرجى المحاولة مجددًا.', 'المتابعة إلى العرض', 'حاول مجددًا', 'إغلاق', 'العرض غير متوفر مؤقتًا.']
};
const humanText = HUMAN_TEXT[popupLanguage];
const offerButton = document.getElementById('offer-link');
const offerStatus = document.getElementById('offer-status');
const humanDialog = document.querySelector('.human-dialog');
const humanStatus = document.getElementById('human-status');
const continueLink = document.getElementById('human-continue');
const retryButton = document.getElementById('human-retry');
const closeHuman = document.querySelector('.human-close');
humanDialog.lang = popup.lang;
humanDialog.dir = popup.dir;
document.getElementById('human-title').textContent = humanText[0];
continueLink.textContent = humanText[5];
retryButton.textContent = humanText[6];
closeHuman.setAttribute('aria-label', humanText[7]);
let turnstileConfiguration;
let widgetId;
let challengeGeneration = 0;
let scriptPromise;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    const timer = setTimeout(() => { script.remove(); scriptPromise = null; reject(new Error('timeout')); }, 15000);
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); script.remove(); scriptPromise = null; reject(new Error('load')); };
    document.head.appendChild(script);
  });
  return scriptPromise;
}
function verificationFailed(generation) {
  if (generation !== challengeGeneration || !humanDialog.open) return;
  humanStatus.textContent = humanText[4];
  continueLink.hidden = true;
  continueLink.removeAttribute('href');
  retryButton.hidden = false;
}
async function beginHumanCheck() {
  const generation = ++challengeGeneration;
  humanStatus.textContent = humanText[1];
  continueLink.hidden = true;
  continueLink.removeAttribute('href');
  retryButton.hidden = true;
  if (widgetId !== undefined && window.turnstile) {
    window.turnstile.remove(widgetId);
    widgetId = undefined;
  }
  try {
    await loadTurnstile();
    if (generation !== challengeGeneration || !humanDialog.open) return;
    widgetId = window.turnstile.render('#turnstile-widget', {
      sitekey: turnstileConfiguration.siteKey,
      action: 'offer', language: popupLanguage === 'pt' ? 'pt-br' : popupLanguage,
      theme: 'light', size: 'flexible',
      callback: async token => {
        if (generation !== challengeGeneration || !humanDialog.open) return;
        humanStatus.textContent = humanText[2];
        try {
          const response = await fetch('/api/offer', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, search: window.location.search }),
            cache: 'no-store', signal: AbortSignal.timeout(15000)
          });
          if (!response.ok) throw new Error('verification');
          const result = await response.json();
          if (generation !== challengeGeneration || !humanDialog.open) return;
          const destination = new URL(result.url);
          if (!['https:', 'http:'].includes(destination.protocol)) throw new Error('url');
          humanStatus.textContent = humanText[3];
          continueLink.href = destination.href;
          continueLink.hidden = false;
          continueLink.focus();
        } catch { verificationFailed(generation); }
      },
      'error-callback': () => { verificationFailed(generation); return true; },
      'expired-callback': () => verificationFailed(generation),
      'timeout-callback': () => verificationFailed(generation)
    });
  } catch { verificationFailed(generation); }
}
function openHumanVerification() {
  if (!turnstileConfiguration?.ready || humanDialog.open) return;
  humanDialog.showModal();
  beginHumanCheck();
}
offerButton.addEventListener('click', openHumanVerification);
popup.addEventListener('click', event => {
  // The real CTA retains its own keyboard and click behaviour.
  if (event.target.closest('a, button, input, select, textarea, label')) return;
  openHumanVerification();
});
retryButton.addEventListener('click', beginHumanCheck);
closeHuman.addEventListener('click', () => humanDialog.close());
humanDialog.addEventListener('close', () => {
  challengeGeneration++;
  if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId);
  widgetId = undefined;
  continueLink.hidden = true;
  continueLink.removeAttribute('href');
  offerButton.focus();
});
if (['https:', 'http:'].includes(window.location.protocol)) {
  // Download Turnstile while the offer configuration is being fetched.
  loadTurnstile().catch(() => {});
  fetch('/api/offer', { cache: 'no-store', signal: AbortSignal.timeout(10000) })
    .then(response => { if (!response.ok) throw new Error('configuration'); return response.json(); })
    .then(config => {
      const discount = config.discount === 80 ? 80 : 90;
      popup.querySelector('[data-discount]').textContent = String(discount);
      document.title = document.title.replace('90%', discount + '%');
      if (!config.ready || typeof config.siteKey !== 'string' || !config.siteKey) throw new Error('configuration');
      turnstileConfiguration = config;
      offerButton.disabled = false;
      popup.classList.add('offer-ready');
      offerStatus.hidden = true;
    })
    .catch(() => { offerStatus.textContent = humanText[8]; });
}