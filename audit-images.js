const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const results = [];
const publicDir = path.join(__dirname, 'public');

walkDir(publicDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
    const stats = fs.statSync(filePath);
    let dims = { width: 0, height: 0 };
    try {
      dims = sizeOf(filePath);
    } catch (e) {}
    
    results.push({
      path: filePath.replace(__dirname, '').replace(/\\/g, '/'),
      format: ext.replace('.', '').toUpperCase(),
      width: dims.width,
      height: dims.height,
      size: stats.size,
    });
  }
});

results.sort((a, b) => b.size - a.size);
console.table(results);
