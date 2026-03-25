import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração do Vite para desenvolvimento com Docker.
// Aqui fazemos proxy das rotas da API e também do admin/static do Django,
// evitando problemas de CORS e permitindo usar /api tanto no dev quanto no homolog.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true,
      },
      "/admin": {
        target: "http://backend:8000",
        changeOrigin: true,
      },
      "/static": {
        target: "http://backend:8000",
        changeOrigin: true,
      },
    },
  },
});