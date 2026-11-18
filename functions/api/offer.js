// Cloudflare Pages Function. Secrets and the offer URL stay on the server.
const APPROVED_OFFER_URL = 'https://to.opticklix.com/5A0C/2J3E6/';
const PUBLIC_SITE_KEY = '0x4AAAAAAGF-jcibLAnbN76y';
const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });

function configuration(env) {
  try {
    const offer = new URL(env.OFFER_URL || APPROVED_OFFER_URL);
    if (!['https:', 'http:'].includes(offer.protocol) || offer.username || offer.password) return null;
    if (!env.TURNSTILE_SECRET_KEY) return null;
    return offer;
  } catch { return null; }
}

export function onRequestGet({ env }) {
  const ready = Boolean(configuration(env));
  return json({ ready, ...(ready ? { siteKey: env.TURNSTILE_SITE_KEY || PUBLIC_SITE_KEY } : {}) });
}

export async function onRequestPost({ request, env }) {
  const offer = configuration(env);
  if (!offer) return json({ error: 'unavailable' }, 503);
  const origin = new URL(request.url);
  if (request.headers.get('Origin') !== origin.origin) return json({ error: 'origin' }, 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'format' }, 415);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return json({ error: 'size' }, 413);
    body = JSON.parse(raw);
  } catch { return json({ error: 'format' }, 400); }
  if (!body || typeof body.token !== 'string' || !body.token || body.token.length > 2048 ||
      typeof body.search !== 'string' || body.search.length > 16000) return json({ error: 'input' }, 400);
  try {
    const data = new FormData();
    data.set('secret', env.TURNSTILE_SECRET_KEY);
    data.set('response', body.token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) data.set('remoteip', ip);
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: data, signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return json({ error: 'verification' }, 502);
    const result = await response.json();
    if (result.success !== true || result.hostname !== origin.hostname || result.action !== 'offer') {
      return json({ error: 'verification' }, 403);
    }
    const incoming = new URLSearchParams(body.search);
    for (const name of new Set(incoming.keys())) {
      offer.searchParams.delete(name);
      for (const value of incoming.getAll(name)) offer.searchParams.append(name, value);
    }
    return json({ url: offer.href });
  } catch { return json({ error: 'verification' }, 502); }
}
