# Worker de la agenda (Cloudflare, gratis)

Guarda tus enlaces secretos iCal fuera del código y de GitHub.

## 1. Obtener el enlace secreto de cada calendario (cuenta personal)
Google Calendar en el navegador (modo escritorio) > ⚙ Configuración > a la izquierda tu calendario >
**Integrar calendario** > **Dirección secreta en formato iCal** (termina en `basic.ics`). Cópiala.
No la pegues en chats ni en archivos del repositorio. Si se filtra, en esa misma pantalla puedes "Restablecer".

## 2. Crear el Worker
1. Cuenta gratis en dash.cloudflare.com > **Workers & Pages** > **Create** > **Hello World** > Deploy.
2. **Edit code**: borra todo, pega el contenido de `worker.js`, **Deploy**.
3. **Settings > Variables and Secrets > Add** (tipo *Secret*):
   - `CAL_JAVIER` = enlace de Javier
   - `CAL_GILLIAN` = enlace de Gillian
   - `ACCESS_KEY` = una clave corta que inventes (ej. `m4nz4na7`)
4. Anota la URL del Worker (`https://....workers.dev`).

## 3. Probar
Abre `https://TU-WORKER.workers.dev/ics/javier?key=TU_CLAVE`: debe mostrar texto que empieza con `BEGIN:VCALENDAR`.
