const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/amin/.gemini/antigravity/brain/abd544b2-845e-472f-8c89-536fe6daf194/.user_uploaded';
const files = fs.readdirSync(dir).map(f => {
  const stat = fs.statSync(path.join(dir, f));
  return { name: f, size: stat.size, time: stat.mtime };
});

files.sort((a, b) => b.time - a.time);

console.log('Top 6 recent files:');
files.slice(0, 6).forEach(f => {
  console.log(`${f.name} - ${f.size} bytes - ${f.time.toISOString()}`);
});
