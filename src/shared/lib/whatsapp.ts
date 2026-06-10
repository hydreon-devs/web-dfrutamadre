/** Enlace wa.me con mensaje pre-escrito. El mensaje se codifica para URL. */
export function buildWaUrl(phoneIntl: string, text: string): string {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(text)}`;
}
