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
