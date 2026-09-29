const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/amin/.gemini/antigravity/brain/abd544b2-845e-472f-8c89-536fe6daf194/.user_uploaded';
const targetDir = 'public/images/courses';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  { src: 'media_1790593770595.jpg', targets: ['science.jpg', '2.png'] },
  { src: 'media_1790593943708.jpg', targets: ['quran.jpg', '3.png'] },
  { src: 'media_1790593943956.jpg', targets: ['academic.jpg', '6.png'] },
  { src: 'media_1790593944261.png', targets: ['coding.png', 'untitled-design-1.png'] },
  { src: 'media_1790593943973.png', targets: ['web-design.png', 'untitled-design-2.png'] },
];

for (const item of mapping) {
  const sourcePath = path.join(srcDir, item.src);
  for (const t of item.targets) {
    const targetPath = path.join(targetDir, t);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${item.src} -> ${targetPath}`);
  }
}
