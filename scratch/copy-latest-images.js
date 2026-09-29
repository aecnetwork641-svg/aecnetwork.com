const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/amin/.gemini/antigravity/brain/abd544b2-845e-472f-8c89-536fe6daf194/.user_uploaded';
const targetDir = 'public/images/courses';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  // 1. Naplan Preparation -> image7.png / naplan.png
  { src: 'media_1790603416500.png', targets: ['naplan.png', 'image7.png'] },

  // 2. SAT & Digital SAT Tutoring -> Gemini_Generated_Image_ocwtaxocwtaxocwt.jfif / sat.jpg
  { src: 'media_1790603465295.jpg', targets: ['sat.jpg', 'Gemini_Generated_Image_ocwtaxocwtaxocwt.jfif'] },

  // 3. GRE Tutoring -> Gemini_Generated_Image_fl06xkfl06xkfl06.jfif / gre.jpg
  { src: 'media_1790603674547.jpg', targets: ['gre.jpg', 'Gemini_Generated_Image_fl06xkfl06xkfl06.jfif'] },

  // 4. English Language Mastery -> Gemini_Generated_Image_wy3nsswy3nsswy3n.jfif / english.jpg
  { src: 'media_1790604410808.jpg', targets: ['english.jpg', 'Gemini_Generated_Image_wy3nsswy3nsswy3n.jfif'] },

  // 5. Arabic Studies (Classical & Modern) -> Gemini_Generated_Image_8fp2b28fp2b28fp2.jfif / arabic.jpg
  { src: 'media_1790604671744.jpg', targets: ['arabic.jpg', 'Gemini_Generated_Image_8fp2b28fp2b28fp2.jfif'] },
];

for (const item of mapping) {
  const sourcePath = path.join(srcDir, item.src);
  for (const t of item.targets) {
    const targetPath = path.join(targetDir, t);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${item.src} -> ${targetPath}`);
  }
}
