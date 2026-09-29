const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/amin/.gemini/antigravity/brain/abd544b2-845e-472f-8c89-536fe6daf194/.user_uploaded';
const targetDir = 'public/images/courses';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  // 1. Mathematics & Analytical Thinking -> math.jpg
  { src: 'media_1790606791483.jpg', targets: ['math.jpg'] },

  // 2. Science (Physics, Chemistry & Biology) -> 13.jpg / science-lab.jpg
  { src: 'media_1790606791478.jpg', targets: ['13.jpg', 'science-lab.jpg'] },

  // 3. Computer Science Foundations -> CSFHR-6240-1200x796-4a9452d.jpg / cs-foundations.jpg
  { src: 'media_1790606792739.jpg', targets: ['CSFHR-6240-1200x796-4a9452d.jpg', 'cs-foundations.jpg'] },

  // 4. Web Development (Full Stack) -> Become-a-full-stack-web-developer_Blog-scaled.jpeg / fullstack.jpeg
  { src: 'media_1790606792749.jpg', targets: ['Become-a-full-stack-web-developer_Blog-scaled.jpeg', 'fullstack.jpeg'] },

  // 5. Social Media Marketing (SMM) -> Gemini_Generated_Image_osjjjjosjjjjosjj.jfif / smm.jfif
  { src: 'media_1790607190318.jpg', targets: ['Gemini_Generated_Image_osjjjjosjjjjosjj.jfif', 'smm.jfif'] },
];

for (const item of mapping) {
  const sourcePath = path.join(srcDir, item.src);
  for (const t of item.targets) {
    const targetPath = path.join(targetDir, t);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${item.src} -> ${targetPath}`);
  }
}
