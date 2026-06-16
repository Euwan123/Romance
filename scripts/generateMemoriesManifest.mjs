import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";

const repoRoot = process.cwd();
const memoriesDir = path.join(repoRoot, "public", "memories");
const thumbsDir = path.join(memoriesDir, "thumbs");
const outFile = path.join(repoRoot, "data", "memories-manifest.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function listImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!exts.has(ext)) continue;
    files.push(entry.name);
  }
  return files;
}

function safeSize(filePath) {
  try {
    const dims = sizeOf(filePath);
    if (typeof dims?.width === "number" && typeof dims?.height === "number") {
      return { width: dims.width, height: dims.height };
    }
  } catch {}
  return { width: 800, height: 1000 };
}

const images = listImages(memoriesDir).map((name) => {
  const fullPath = path.join(memoriesDir, name);
  const { width, height } = safeSize(fullPath);
  const id = name.replace(path.extname(name), "");
  const thumbPath = path.join(thumbsDir, name);
  const hasThumb = fs.existsSync(thumbPath);
  const src = `/memories/${name}`;
  const thumbSrc = hasThumb ? `/memories/thumbs/${name}` : src;
  return { id, src, thumbSrc, width, height, aspectRatio: width / height };
});

images.sort((a, b) => a.id.localeCompare(b.id));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(images, null, 2), "utf8");

