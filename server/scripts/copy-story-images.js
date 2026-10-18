const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\bb33b06b-f321-4b37-894b-7793a5cfb868';
const destDir = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\mirchi-store\\client\\public\\images';

const filesToCopy = [
  { src: 'story_harvest_1787578277357.jpg', dest: 'story_harvest.jpg' },
  { src: 'story_drying_1787578301944.jpg', dest: 'story_drying.jpg' },
  { src: 'story_pounding_1787578322895.jpg', dest: 'story_pounding.jpg' },
  { src: 'story_packaging_1787578344554.jpg', dest: 'story_packaging.jpg' },
];

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

filesToCopy.forEach(item => {
  const s = path.join(srcDir, item.src);
  const d = path.join(destDir, item.dest);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.log(`Not found: ${s}`);
  }
});
