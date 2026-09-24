import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Cotizador: hasta 4 MB de planos adjuntos (src/lib/quote.ts) más
      // los campos del formulario y el sobrecosto de multipart.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
