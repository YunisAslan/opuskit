// No booking backend yet: forms hand the details to the visitor's own mail app, filled in and ready to send.
export function openMail(to: string, subject: string, rows: [string, string | undefined][]) {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
