import fs from "node:fs";
import path from "node:path";

const src = path.join(process.cwd(), "Music", "Music1.mp4");
const dest = path.join(process.cwd(), "public", "music", "Music1.mp4");

if (fs.existsSync(src)) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}
