const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\bb33b06b-f321-4b37-894b-7793a5cfb868';
const destDir = path.join(__dirname, '../../client/public/images');

const assets = [
  { src: 'masala_karam_1784046374949.png', dest: 'masala_karam.png' },
  { src: 'goddu_karam_1784046395583.png', dest: 'goddu_karam.png' },
  { src: 'hero_spices_1784046409875.png', dest: 'hero_spices.png' },
  { src: 'hero_chilli_field_1784049737350.png', dest: 'hero_chilli_field.png' },
  { src: 'kandi_podi_1786965927146.png', dest: 'kandi_podi.png' },
  { src: 'nalla_karam_1786965977139.png', dest: 'nalla_karam.png' },
  { src: 'peanut_chutney_powder_1786966015690.png', dest: 'peanut_chutney_powder.png' },
  { src: 'kobbari_karam_1786966038284.png', dest: 'kobbari_karam.png' },
  { src: 'story_harvest_1787578277357.jpg', dest: 'story_harvest.jpg' },
  { src: 'story_drying_1787578301944.jpg', dest: 'story_drying.jpg' },
  { src: 'story_pounding_1787578322895.jpg', dest: 'story_pounding.jpg' },
  { src: 'story_packaging_1787578344554.jpg', dest: 'story_packaging.jpg' },
];

function copyAssets() {
  console.log('Copying generated images to client public assets directory...');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }
  assets.forEach(asset => {
    const srcPath = path.join(srcDir, asset.src);
    const destPath = path.join(destDir, asset.dest);
    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${asset.src} → ${asset.dest}`);
      } catch (err) {
        console.error(`❌ Failed to copy ${asset.src}:`, err.message);
      }
    } else {
      console.warn(`⚠️  Source not found: ${srcPath}`);
    }
  });
  console.log('Done.');
}
copyAssets();
