import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

const IMAGE_QUALITY = {
  avif: 75,
  webp: 82,
  jpeg: 88
};

const IMAGE_SIZES = {
  hero: [1920, 1280, 750, 375],
  game: [1920, 1280, 750, 375],
  item: [256, 128, 64],
  player: [512, 256, 128],
  news: [800, 400, 200]
};

const IMAGE_CONFIG = {
  'hero-landscape': { type: 'hero', priority: 'high' },
  'kingdom-': { type: 'game', priority: 'high' },
  'item-': { type: 'item', priority: 'medium' },
  'player-': { type: 'player', priority: 'medium' },
  'daily-': { type: 'news', priority: 'low' }
};

function getImageConfig(filename) {
  for (const [prefix, config] of Object.entries(IMAGE_CONFIG)) {
    if (filename.startsWith(prefix)) {
      return config;
    }
  }
  return { type: 'game', priority: 'medium' };
}

async function shouldProcess(inputPath, outputPath) {
  if (!fs.existsSync(outputPath)) return true;

  const inputStat = fs.statSync(inputPath);
  const outputStat = fs.statSync(outputPath);

  return inputStat.mtime > outputStat.mtime || outputStat.size === 0;
}

async function convertImage(inputPath, outputPath, format, quality, width = null) {
  try {
    let pipeline = sharp(inputPath);

    if (width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    switch (format) {
      case 'avif':
        await pipeline.avif({ quality, effort: 4 }).toFile(outputPath);
        break;
      case 'webp':
        await pipeline.webp({ quality, effort: 4 }).toFile(outputPath);
        break;
      case 'jpeg':
        await pipeline.jpeg({ quality, progressive: true }).toFile(outputPath);
        break;
      case 'png':
        await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outputPath);
        break;
    }

    const stats = fs.statSync(outputPath);
    return { success: true, size: stats.size };
  } catch (error) {
    console.error(`Error converting ${inputPath} to ${format}:`, error.message);
    return { success: false, size: 0 };
  }
}

async function cleanupOrphanedFiles(outputDir, inputDir) {
  if (!fs.existsSync(outputDir)) return;

  const rawFiles = new Set(
    fs.readdirSync(inputDir)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => path.basename(f, path.extname(f)))
  );

  const generatedFiles = fs.readdirSync(outputDir)
    .filter(f => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));

  let removedCount = 0;
  for (const file of generatedFiles) {
    const baseName = file.replace(/-\d+(\.avif|\.webp|\.jpg|\.jpeg|\.png)$/, '');
    const cleanBaseName = baseName.replace(/\.(avif|webp|jpg|jpeg|png)$/, '');

    if (!rawFiles.has(cleanBaseName)) {
      fs.unlinkSync(path.join(outputDir, file));
      console.log(`←  Removed orphaned: ${file}`);
      removedCount++;
    }
  }

  if (removedCount > 0) {
    console.log(`\n← Cleaned up ${removedCount} orphaned files`);
  }
}

async function processImage(inputPath, outputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  const config = getImageConfig(filename);
  const { type, priority } = config;
  const sizes = IMAGE_SIZES[type] || [1920, 1280, 750, 375];
  const isPng = ext === '.png';

  console.log(`\nProcessing: ${filename}${ext} (${type}, priority: ${priority})`);

  const originalSize = fs.statSync(inputPath).size;

  if (priority === 'high') {
    for (const width of sizes) {
      const suffix = width === sizes[0] ? '' : `-${width}`;

      const avifPath = path.join(outputPath, `${filename}${suffix}.avif`);
      const webpPath = path.join(outputPath, `${filename}${suffix}.webp`);

      if (await shouldProcess(inputPath, avifPath)) {
        const avifResult = await convertImage(inputPath, avifPath, 'avif', IMAGE_QUALITY.avif, width);
        if (avifResult.success) {
          const savings = ((originalSize - avifResult.size) / originalSize * 100).toFixed(1);
          console.log(`  ✓ AVIF ${width}px: ${(avifResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
        }
      } else {
        console.log(`  →  AVIF ${width}px: Skipped (up to date)`);
      }

      if (await shouldProcess(inputPath, webpPath)) {
        const webpResult = await convertImage(inputPath, webpPath, 'webp', IMAGE_QUALITY.webp, width);
        if (webpResult.success) {
          const savings = ((originalSize - webpResult.size) / originalSize * 100).toFixed(1);
          console.log(`  ✓ WebP ${width}px: ${(webpResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
        }
      } else {
        console.log(`  →  WebP ${width}px: Skipped (up to date)`);
      }

      if (width === sizes[0] && !isPng) {
        const jpegPath = path.join(outputPath, `${filename}${suffix}.jpg`);
        if (await shouldProcess(inputPath, jpegPath)) {
          const jpegResult = await convertImage(inputPath, jpegPath, 'jpeg', IMAGE_QUALITY.jpeg, width);
          if (jpegResult.success) {
            const savings = ((originalSize - jpegResult.size) / originalSize * 100).toFixed(1);
            console.log(`  ✓ JPEG ${width}px: ${(jpegResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
          }
        } else {
          console.log(`  →  JPEG ${width}px: Skipped (up to date)`);
        }
      }
    }
  } else {
    const avifPath = path.join(outputPath, `${filename}.avif`);
    const webpPath = path.join(outputPath, `${filename}.webp`);

    if (await shouldProcess(inputPath, avifPath)) {
      const avifResult = await convertImage(inputPath, avifPath, 'avif', IMAGE_QUALITY.avif);
      if (avifResult.success) {
        const savings = ((originalSize - avifResult.size) / originalSize * 100).toFixed(1);
        console.log(`  ✓ AVIF: ${(avifResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
      }
    } else {
      console.log(`  →  AVIF: Skipped (up to date)`);
    }

    if (await shouldProcess(inputPath, webpPath)) {
      const webpResult = await convertImage(inputPath, webpPath, 'webp', IMAGE_QUALITY.webp);
      if (webpResult.success) {
        const savings = ((originalSize - webpResult.size) / originalSize * 100).toFixed(1);
        console.log(`  ✓ WebP: ${(webpResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
      }
    } else {
      console.log(`  →  WebP: Skipped (up to date)`);
    }

    if (!isPng) {
      const jpegPath = path.join(outputPath, `${filename}.jpg`);
      if (await shouldProcess(inputPath, jpegPath)) {
        const jpegResult = await convertImage(inputPath, jpegPath, 'jpeg', IMAGE_QUALITY.jpeg);
        if (jpegResult.success) {
          const savings = ((originalSize - jpegResult.size) / originalSize * 100).toFixed(1);
          console.log(`  ✓ JPEG: ${(jpegResult.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
        }
      } else {
        console.log(`  →  JPEG: Skipped (up to date)`);
      }
    }
  }
}

async function main() {
  const inputDir = path.join(projectRoot, 'public', 'images', 'raw');
  const outputDir = path.join(projectRoot, 'public', 'images');

  if (!fs.existsSync(inputDir)) {
    console.error(`✗ 原图目录不存在: ${inputDir}`);
    console.log(`请创建目录并放入原图: mkdir -p public/images/raw`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await cleanupOrphanedFiles(outputDir, inputDir);

  const imageFiles = fs.readdirSync(inputDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => path.join(inputDir, file));

  console.log(`Found ${imageFiles.length} images to process`);
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output directory: ${outputDir}`);

  let processed = 0;
  let failed = 0;

  for (const imagePath of imageFiles) {
    try {
      await processImage(imagePath, outputDir);
      processed++;
    } catch (error) {
      console.error(`Failed to process ${imagePath}:`, error);
      failed++;
    }
  }

  console.log(`\n✓ Processed ${processed} images successfully`);
  if (failed > 0) {
    console.log(`✗ Failed to process ${failed} images`);
  }
}

main().catch(console.error);
