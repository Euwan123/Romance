import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";

const repoRoot = process.cwd();
const imagesRoot = path.join(repoRoot, "Images");
const publicGalleryRoot = path.join(repoRoot, "public", "gallery");
const outFile = path.join(repoRoot, "data", "galleries-manifest.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const albums = [
  { id: "cats", folder: "Cats" },
  { id: "us-together", folder: "DuoPic" },
  { id: "food-trip", folder: "FoodsTogether" },
  { id: "graduation", folder: "GraduationPics" },
  { id: "solo", folder: "SoloPic" },
  { id: "random", folder: "Others" }
];

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!exts.has(ext)) continue;
    files.push(entry.name);
  }
  return files.sort((a, b) => a.localeCompare(b));
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

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
  }
}

const manifest = { albums: [] };

for (const album of albums) {
  const sourceDir = path.join(imagesRoot, album.folder);
  const destDir = path.join(publicGalleryRoot, album.folder);
  const names = listImages(sourceDir);
  const photos = names.map((name) => {
    const sourcePath = path.join(sourceDir, name);
    const destPath = path.join(destDir, name);
    copyFile(sourcePath, destPath);
    const { width, height } = safeSize(sourcePath);
    const id = name.replace(path.extname(name), "");
    const src = `/gallery/${album.folder}/${name}`;
    return { id, src, thumbSrc: src, width, height, aspectRatio: width / height };
  });

  manifest.albums.push({
    id: album.id,
    folder: album.folder,
    cover: photos[0]?.thumbSrc ?? null,
    count: photos.length,
    photos
  });
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), "utf8");
