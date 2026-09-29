const fs = require('fs');

const svg = fs.readFileSync('public/images/aec-logo.svg', 'utf8');
const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
let match;
let count = 0;
while ((match = regex.exec(svg)) !== null) {
  count++;
  const buf = Buffer.from(match[1], 'base64');
  fs.writeFileSync(`scratch/extracted_${count}.png`, buf);
  console.log(`Saved extracted_${count}.png, size: ${buf.length}`);
}
