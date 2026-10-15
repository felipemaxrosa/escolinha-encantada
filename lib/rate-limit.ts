type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();
const WINDOW_MS = 60_000;

/**
 * Rate-limit em memória por chave (janela fixa).
 * Nota: reinicia em cold-starts serverless — aceitável para o demo.
 * Devolve `true` se o pedido é permitido, `false` se excedeu o limite.
 */
export function rateLimit(
  key: string,
  max = Number(process.env.RATE_LIMIT_MAX) || 5,
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count += 1;
  return true;
}

/** Apenas para testes. */
export function _resetRateLimit(): void {
  store.clear();
}
