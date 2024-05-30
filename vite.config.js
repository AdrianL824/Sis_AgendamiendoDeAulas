import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://mel-backend.onrender.com",//cambiar
        changeOrigin: true,
        secure: false,
        cors: true,
        ws: true, // Habilitar soporte para WebSocket (si es necesario)
        methods: ["GET", "POST", "PUT", "DELETE"], // Especifica los métodos permitidos
      },
    },
  },

  build: {
    outDir: "dist",
  },
});
