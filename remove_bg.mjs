import sharp from 'sharp';
import fs from 'fs';

async function removeBlackBackground(inputPath, outputPath, options = {}) {
  const { threshold = 16, feather = 2 } = options;
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const width = meta.width;
  const height = meta.height;
  
  const { data: rawRgb } = await image.toColourspace('srgb').raw().toBuffer({ resolveWithObject: true });
  
  // First, compute the horizontal bounding silhouette [minX[y], maxX[y]]
  // For each row y, scanning from x=0 inward and x=width-1 inward
  const leftEdge = new Int32Array(height);
  const rightEdge = new Int32Array(height);
  
  for (let y = 0; y < height; y++) {
    let lx = 0;
    while (lx < width && Math.max(rawRgb[(y * width + lx) * 3], rawRgb[(y * width + lx) * 3 + 1], rawRgb[(y * width + lx) * 3 + 2]) <= threshold) {
      lx++;
    }
    leftEdge[y] = lx;
    
    let rx = width - 1;
    while (rx >= 0 && Math.max(rawRgb[(y * width + rx) * 3], rawRgb[(y * width + rx) * 3 + 1], rawRgb[(y * width + rx) * 3 + 2]) <= threshold) {
      rx--;
    }
    rightEdge[y] = rx;
  }
  
  // Also topEdge for columns:
  const topEdge = new Int32Array(width);
  for (let x = 0; x < width; x++) {
    let ty = 0;
    while (ty < height && Math.max(rawRgb[(ty * width + x) * 3], rawRgb[(ty * width + x) * 3 + 1], rawRgb[(ty * width + x) * 3 + 2]) <= threshold) {
      ty++;
    }
    topEdge[x] = ty;
  }
  
  // A pixel (x, y) is background IF AND ONLY IF:
  // 1. It is outside the subject envelope (x < leftEdge[y] || x > rightEdge[y] || y < topEdge[x])
  // 2. OR it is connected to the outer boundary through low-brightness pixels without ever penetrating deep inside the subject silhouette.
  // By enforcing that background flood can never pass inside [leftEdge[y], rightEdge[y]], interior dark clothing is 100% immune from leaking!
  
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  
  function isOuterBg(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    // Must be near background brightness AND outside or on the exact boundary edge
    const idx = (y * width + x) * 3;
    const isDark = Math.max(rawRgb[idx], rawRgb[idx+1], rawRgb[idx+2]) <= threshold;
    if (!isDark) return false;
    
    // Pixel is strictly outside the silhouette
    if (x <= leftEdge[y] || x >= rightEdge[y] || y <= topEdge[x]) {
      return true;
    }
    return false;
  }
  
  // Push all true outer border pixels
  for (let x = 0; x < width; x++) {
    const pIdx = 0 * width + x;
    if (isOuterBg(x, 0) && !visited[pIdx]) {
      visited[pIdx] = 1;
      queue[tail++] = pIdx;
    }
  }
  for (let y = 0; y < height; y++) {
    const pIdxL = y * width + 0;
    if (isOuterBg(0, y) && !visited[pIdxL]) {
      visited[pIdxL] = 1;
      queue[tail++] = pIdxL;
    }
    const pIdxR = y * width + (width - 1);
    if (isOuterBg(width - 1, y) && !visited[pIdxR]) {
      visited[pIdxR] = 1;
      queue[tail++] = pIdxR;
    }
  }
  
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);
    
    // 4 directions
    const dirs = [
      [cx - 1, cy],
      [cx + 1, cy],
      [cx, cy - 1],
      [cx, cy + 1]
    ];
    
    for (const [nx, ny] of dirs) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isOuterBg(nx, ny)) {
          visited[nIdx] = 1;
          queue[tail++] = nIdx;
        }
      }
    }
  }
  
  // Also, any pixel with x < leftEdge[y] or x > rightEdge[y] or y < topEdge[x] is automatically background!
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < leftEdge[y] || x > rightEdge[y] || y < topEdge[x]) {
        visited[y * width + x] = 1;
      }
    }
  }

  console.log(`Envelope + Flood fill for ${inputPath}: ${tail} queued, total marked bg: ${visited.filter(v => v === 1).length} (${((visited.filter(v => v === 1).length / (width * height)) * 100).toFixed(1)}%)`);
  
  // Anti-aliased alpha blending
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const rgbIdx = pIdx * 3;
      const rgbaIdx = pIdx * 4;
      
      rgba[rgbaIdx] = rawRgb[rgbIdx];
      rgba[rgbaIdx + 1] = rawRgb[rgbIdx + 1];
      rgba[rgbaIdx + 2] = rawRgb[rgbIdx + 2];
      
      if (visited[pIdx] === 1) {
        rgba[rgbaIdx + 3] = 0;
      } else {
        // Foreground pixel: check distance to background
        let minBgDist = 999;
        for (let dy = -2; dy <= 2; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          for (let dx = -2; dx <= 2; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            if (visited[ny * width + nx] === 1) {
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < minBgDist) minBgDist = d;
            }
          }
        }
        
        if (minBgDist <= 1.0) {
          rgba[rgbaIdx + 3] = Math.round(180 * (minBgDist / 1.0));
        } else {
          rgba[rgbaIdx + 3] = 255;
        }
      }
    }
  }
  
  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);
  
  console.log(`Saved transparent PNG to ${outputPath}`);
}

async function run() {
  const images = [
    {
      in: 'C:/Users/SIRI/.gemini/antigravity-ide/brain/8b9ee31d-7caf-4e53-90ad-2b04ce0a86d5/.user_uploaded/media_1790865924993.jpg',
      out: 'c:/Users/SIRI/OneDrive/Documents/ne/public/images/hero_middle.png',
      threshold: 16
    },
    {
      in: 'C:/Users/SIRI/.gemini/antigravity-ide/brain/8b9ee31d-7caf-4e53-90ad-2b04ce0a86d5/.user_uploaded/media_1790865955719.jpg',
      out: 'c:/Users/SIRI/OneDrive/Documents/ne/public/images/hero_left.png',
      threshold: 16
    },
    {
      in: 'C:/Users/SIRI/.gemini/antigravity-ide/brain/8b9ee31d-7caf-4e53-90ad-2b04ce0a86d5/.user_uploaded/media_1790866031407.jpg',
      out: 'c:/Users/SIRI/OneDrive/Documents/ne/public/images/hero_right.png',
      threshold: 16
    }
  ];

  for (const item of images) {
    await removeBlackBackground(item.in, item.out, { threshold: item.threshold });
  }
}

run().catch(console.error);
