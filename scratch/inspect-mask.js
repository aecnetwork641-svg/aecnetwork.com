const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('scratch/extracted_1.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

let offset = 8;
let idatBuffers = [];
while (offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') {
    idatBuffers.push(buf.slice(offset + 8, offset + 8 + length));
  }
  offset += 12 + length;
}
const compressed = Buffer.concat(idatBuffers);
const raw = zlib.inflateSync(compressed);

const stride = 1 + width;
let values = new Set();
let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  const lineStart = y * stride;
  for (let x = 0; x < width; x++) {
    const v = raw[lineStart + 1 + x];
    values.add(v);
    if (v > 10) { // non-black pixel in mask
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Unique mask values sample:', Array.from(values).slice(0, 20));
console.log('Mask > 10 bounding box:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });
