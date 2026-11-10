// Worker de la agenda: sirve la página (carpeta public/) y entrega los calendarios iCal.
// Secretos (Cloudflare > Settings > Variables and Secrets, tipo Secret):
//   CAL_JAVIER, CAL_GILLIAN, CAL_EMPRESA (enlaces iCal secretos) y ACCESS_KEY (clave de acceso).

const DAYS_BACK = 45; // eventos más antiguos que esto (y sin repetición) se descartan para aligerar

function ymd(d) { return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate(); }

// Quita eventos viejos para que la TV reciba un archivo mucho más liviano.
export function trimICS(text, now = new Date()) {
  const cutoff = ymd(new Date(now.getTime() - DAYS_BACK * 86400000));
  const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const out = [];
  let block = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { block = [line]; continue; }
    if (block) {
      block.push(line);
      if (line === 'END:VEVENT') {
        const body = block.join('\n');
        const start = /^DTSTART[^:]*:(\d{8})/m.exec(body);
        const until = /^RRULE:.*UNTIL=(\d{8})/m.exec(body);
        const recurring = /^RRULE:/m.test(body);
        let keep = true;
        if (start) {
          const s = parseInt(start[1], 10);
          if (recurring) { if (until && parseInt(until[1], 10) < cutoff) keep = false; }
          else if (s < cutoff) keep = false;
        }
        if (keep) out.push(...block);
        block = null;
      }
      continue;
    }
    if (line) out.push(line);
  }
  return out.join('\r\n') + '\r\n';
}

export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': '*' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/ics\/([a-z0-9_-]{1,32})$/i);
    if (!m) return env.ASSETS ? env.ASSETS.fetch(request) : new Response('No encontrado', { status: 404 });
    if (env.ACCESS_KEY && url.searchParams.get('key') !== env.ACCESS_KEY)
      return new Response('Clave incorrecta', { status: 401, headers: cors });
    const source = env['CAL_' + m[1].toUpperCase()];
    if (!source || !/^https:\/\/calendar\.google\.com\//.test(source))
      return new Response('Calendario no configurado', { status: 404, headers: cors });
    const upstream = await fetch(source, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!upstream.ok) return new Response('Google respondió ' + upstream.status, { status: 502, headers: cors });
    return new Response(trimICS(await upstream.text()), {
      headers: { ...cors, 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'private, max-age=60' }
    });
  }
};
