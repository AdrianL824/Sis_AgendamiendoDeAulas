import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

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
