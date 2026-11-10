// Configuración pública (aquí NO van enlaces secretos de Google).
// Los enlaces iCal viven como secretos en el Worker (ver worker/README.md).
window.AGENDA_CONFIG = {
  // Vacío = los calendarios se piden al mismo sitio donde está la página (lo normal).
  workerUrl: "",
  // Calendarios a mostrar. "id" debe coincidir con el secreto del Worker (CAL_<ID en mayúsculas>).
  calendars: [
    { id: "javier",  name: "Javier",  color: "#4da3ff" },
    { id: "gillian", name: "Gillian", color: "#ff7eb6" }
    // Más adelante: { id: "empresa", name: "Empresa", color: "#ffb84d" }
  ],
  refreshMinutes: 10,
  weekStartsOn: 1,      // 1 = lunes, 0 = domingo
  dayStartHour: 0       // el día se considera de 0:00 a 24:00
};
