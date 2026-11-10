# Agenda semanal para la TV

Página web (ES5, compatible con el navegador de la Samsung 2017) que muestra la semana con varios calendarios de Google.

- `index.html` + `config.js` — la agenda. `?demo` muestra datos de ejemplo.
- `worker/` — Worker de Cloudflare que guarda los enlaces secretos iCal (ver `worker/README.md`).
- `vendor/ical.min.js` — lector de iCalendar (ical.js, MPL-2.0).

Control con el remoto: ◀ ▶ cambia de semana, OK vuelve a hoy.
La clave de acceso se guarda en el navegador al abrir una vez `.../index.html#key=TU_CLAVE`.
