import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // The output directory where the production files will be generated
    assetsDir: "assets", // Where static assets (images, fonts) will be placed
  },
});
