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

// Set this project's approved offer URL here. No destination is assumed.
const OFFER_URL = '';
const link = document.getElementById('offer-link');
if (OFFER_URL) {
  const destination = new URL(OFFER_URL);
  const incoming = new URLSearchParams(window.location.search);
  for (const name of new Set(incoming.keys())) {
    destination.searchParams.delete(name);
    for (const value of incoming.getAll(name)) destination.searchParams.append(name, value);
  }
  link.href = destination.href;
  link.removeAttribute('aria-disabled');
  document.getElementById('offer-status').hidden = true;
} else {
  link.addEventListener('click', event => event.preventDefault());
}
const motion = document.querySelector('.motion');
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
  motion.textContent = paused ? '▶' : 'Ⅱ';
});
document.querySelector('.search').addEventListener('submit', event => event.preventDefault());
