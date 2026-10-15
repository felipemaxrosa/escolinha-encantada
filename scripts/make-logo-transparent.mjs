// Torna o fundo branco de um PNG transparente, via flood-fill a partir das bordas
// (preserva os brilhos brancos no interior das peças, que não tocam o fundo).
// Uso: node scripts/make-logo-transparent.mjs <entrada.png> <saida.png>

import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";

const [, , SRC, OUT] = process.argv;
const THRESH = 236; // considerar "branco" acima deste valor em R,G,B

const png = PNG.sync.read(readFileSync(SRC));
const { width, height, data } = png;
const near = (i) =>
  data[i] >= THRESH && data[i + 1] >= THRESH && data[i + 2] >= THRESH;

const visited = new Uint8Array(width * height);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (visited[p]) return;
  visited[p] = 1;
  stack.push(x, y);
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

let cleared = 0;
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  const i = (y * width + x) * 4;
  if (!near(i)) continue;
  data[i + 3] = 0; // transparente
  cleared++;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

writeFileSync(OUT, PNG.sync.write(png));
console.log(`OK ${OUT} (${width}x${height}, ${cleared} px transparentes)`);
