const fs = require('fs');
const zlib = require('zlib');

function getRGB(filename) {
  const buf = fs.readFileSync(filename);
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
  return { width, height, raw };
}

const mask = getRGB('scratch/extracted_1.png');
console.log('Mask width:', mask.width, 'height:', mask.height, 'raw len:', mask.raw.length);

const main = getRGB('scratch/extracted_2.png');
console.log('Main width:', main.width, 'height:', main.height, 'raw len:', main.raw.length);

// Analyze mask (extracted_1.png) - grayscale or indexed or RGB
// Let's find non-black / non-transparent pixels in mask
const width = mask.width;
const height = mask.height;

// For grayscale (colorType 0) or RGB:
// Let's inspect stride
const bppMask = Math.floor((mask.raw.length - height) / (width * height));
console.log('bppMask:', bppMask);

let minX = width, maxX = 0, minY = height, maxY = 0;
const stride = 1 + width * bppMask;

for (let y = 0; y < height; y++) {
  const lineStart = y * stride;
  for (let x = 0; x < width; x++) {
    const idx = lineStart + 1 + x * bppMask;
    const val = mask.raw[idx];
    if (val < 240) { // In inverted mask / grayscale filter, non-white means visible!
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Mask non-white bounding box (in 750x510 coordinates):');
console.log({ minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });
