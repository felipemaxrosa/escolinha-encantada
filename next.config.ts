import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // URL limpo para a página de proposta (ficheiro estático em public/).
  // Temporário — remover junto com public/proposta.html quando já não for preciso.
  async rewrites() {
    return [{ source: "/proposta", destination: "/proposta.html" }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
