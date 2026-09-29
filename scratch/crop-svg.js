const fs = require('fs');

function cropSVG(filePath, newViewBox) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/viewBox="[^"]+"/, `viewBox="${newViewBox}"`);
  content = content.replace(/width="[0-9.]+"/, `width="300"`);
  content = content.replace(/height="[0-9.]+"/, `height="184"`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath} with viewBox="${newViewBox}"`);
}

// Bounding box in SVG coordinates:
// X: 67.71 to 145.80 (width ~78.09)
// Y: 66.46 to 114.45 (height ~47.99)
// With a small padding margin: X=64, Y=63, W=86, H=55
const croppedViewBox = "64 63 86 55";

cropSVG('public/images/aec-logo.svg', croppedViewBox);
cropSVG('public/logo.svg', croppedViewBox);
cropSVG('src/app/icon.svg', croppedViewBox);
