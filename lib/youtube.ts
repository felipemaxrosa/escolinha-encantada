/** Extrai o ID de 11 caracteres de um link do YouTube (watch, youtu.be, embed,
 *  shorts) ou devolve o próprio valor se já for um ID. `null` se não reconhecer. */
export function youtubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const url = input.trim();
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return null;
}
