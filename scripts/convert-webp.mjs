import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { join, extname, dirname, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return

  const outputPath = filePath.replace(ext, '.webp')

  // Skip if WebP already exists and is newer than source
  try {
    const stat = statSync(outputPath)
    const srcStat = statSync(filePath)
    if (stat.mtimeMs > srcStat.mtimeMs) {
      console.log(`  ⏭️  Skipping (already up-to-date): ${parse(filePath).base}`)
      return
    }
  } catch {
    // WebP doesn't exist, proceed
  }

  try {
    await sharp(filePath)
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath)
    console.log(`  ✅ Converted: ${parse(filePath).base} → ${parse(filePath).name}.webp`)
  } catch (err) {
    console.error(`  ❌ Failed: ${parse(filePath).base} — ${err.message}`)
  }
}

async function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkDir(fullPath)
    } else if (entry.isFile()) {
      await convertToWebP(fullPath)
    }
  }
}

console.log('🔄 Converting images to WebP...\n')
console.log(`📁 Scanning: ${imagesDir}\n`)

try {
  await walkDir(imagesDir)
  console.log('\n✨ Done!')
} catch (err) {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
}
