# Agenda semanal para la TV

Página web (ES5, compatible con el navegador de la Samsung 2017) que muestra la semana con varios calendarios de Google.
Se publica en Cloudflare Workers desde este repositorio (carpeta `agenda/`).

- `public/` — la página: `index.html`, `config.js` (colores y nombres), `vendor/ical.min.js` (ical.js, MPL-2.0).
- `worker.js` — sirve la página y entrega los calendarios iCal (recorta eventos de más de 45 días de antigüedad).
- `wrangler.jsonc` — configuración del Worker (`agendasamsung`).

Secretos (solo en Cloudflare > Settings > Variables and Secrets, tipo Secret; NUNCA en el repositorio):
`CAL_JAVIER`, `CAL_GILLIAN`, `CAL_EMPRESA` (enlaces iCal secretos) y `ACCESS_KEY` (clave de acceso).

Control con el remoto: ◀ ▶ cambia de semana, OK vuelve a hoy. La primera vez la agenda pide la clave en pantalla.
`/?demo` muestra datos de ejemplo.
