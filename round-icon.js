/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');

async function roundCorners(inputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const r = Math.floor(metadata.width * 0.2);
  
  const mask = Buffer.from(
    `<svg><rect x="0" y="0" width="${metadata.width}" height="${metadata.height}" rx="${r}" ry="${r}" /></svg>`
  );

  const outputPath = inputPath + '.tmp.png';
  await image
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(outputPath);
    
  fs.renameSync(outputPath, inputPath);
}

async function run() {
  await roundCorners('src/app/icon.png');
  await roundCorners('src/app/apple-icon.png');
  console.log('Icons rounded successfully.');
}

run().catch(console.error);

