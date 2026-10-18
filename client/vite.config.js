import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-sync all generated high-res images directly into client/public/images
const syncImages = () => {
  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\bb33b06b-f321-4b37-894b-7793a5cfb868';
  const targetDir = path.resolve(__dirname, 'public/images');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  
  const mappings = [
    { src: 'story_harvest_1787578277357.jpg', dest: 'story_harvest.jpg' },
    { src: 'story_drying_1787578301944.jpg', dest: 'story_drying.jpg' },
    { src: 'story_pounding_1787578322895.jpg', dest: 'story_pounding.jpg' },
    { src: 'story_packaging_1787578344554.jpg', dest: 'story_packaging.jpg' },
    { src: 'hero_chilli_field_1784049737350.png', dest: 'hero_chilli_field.png' },
    { src: 'hero_spices_1784046409875.png', dest: 'hero_spices.png' },
    { src: 'masala_karam_1784046374949.png', dest: 'masala_karam.png' },
    { src: 'goddu_karam_1784046395583.png', dest: 'goddu_karam.png' },
    { src: 'kandi_podi_1786965927146.png', dest: 'kandi_podi.png' },
    { src: 'nalla_karam_1786965977139.png', dest: 'nalla_karam.png' },
    { src: 'peanut_chutney_powder_1786966015690.png', dest: 'peanut_chutney_powder.png' },
    { src: 'kobbari_karam_1786966038284.png', dest: 'kobbari_karam.png' },
  ];

  mappings.forEach(({ src, dest }) => {
    const s = path.join(artifactDir, src);
    const d = path.join(targetDir, dest);
    if (fs.existsSync(s)) {
      try {
        fs.copyFileSync(s, d);
      } catch (e) {}
    }
  });
};

syncImages();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'auto-sync-assets',
      buildStart() {
        syncImages();
      },
      configureServer(server) {
        syncImages();
      }
    }
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
