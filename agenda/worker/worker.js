// Cloudflare Worker: guarda tus enlaces secretos iCal y los entrega a la agenda.
// Secretos (Settings > Variables and Secrets, tipo "Secret"):
//   CAL_JAVIER  = enlace .ics secreto del calendario de Javier
//   CAL_GILLIAN = enlace .ics secreto del calendario de Gillian
//   CAL_EMPRESA = (más adelante)
//   ACCESS_KEY  = clave corta que la agenda envía (recomendado)
export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': '*' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/ics\/([a-z0-9_-]{1,32})$/i);
    if (!m) return new Response('No encontrado', { status: 404, headers: cors });
    if (env.ACCESS_KEY && url.searchParams.get('key') !== env.ACCESS_KEY)
      return new Response('Clave incorrecta', { status: 401, headers: cors });
    const source = env['CAL_' + m[1].toUpperCase()];
    if (!source || !/^https:\/\/calendar\.google\.com\//.test(source))
      return new Response('Calendario no configurado', { status: 404, headers: cors });
    const upstream = await fetch(source, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!upstream.ok) return new Response('Google respondió ' + upstream.status, { status: 502, headers: cors });
    return new Response(await upstream.text(), {
      headers: { ...cors, 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'private, max-age=60' }
    });
  }
};
