const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/amin/.gemini/antigravity/brain/abd544b2-845e-472f-8c89-536fe6daf194/.user_uploaded';
const targetDir = 'public/images/courses';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  // 1. Qirat & Melodic Recitation
  { src: 'media_1790600189504.jpg', targets: ['qirat.jpg', 'Gemini_Generated_Image_ca4pocca4pocca4p.jfif'] },

  // 2. Translation & Islamic Studies
  { src: 'media_1790600189539.jpg', targets: ['translation.jpg', 'how-to-improve-qirat-of-quran-1024x683.jpg'] },

  // 3. Hifz-ul-Quran (Memorization)
  { src: 'media_1790600227782.jpg', targets: ['hifz.jpg', 'image1.png'] },

  // 4. GCSE & IGCSE Tutoring
  { src: 'media_1790600189536.png', targets: ['gcse.png', 'image23.png'] },

  // 5. O & A Levels (Cambridge / Edexcel)
  { src: 'media_1790600291646.png', targets: ['o-a-levels.png', 'image3.png'] },
];

for (const item of mapping) {
  const sourcePath = path.join(srcDir, item.src);
  for (const t of item.targets) {
    const targetPath = path.join(targetDir, t);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${item.src} -> ${targetPath}`);
  }
}
