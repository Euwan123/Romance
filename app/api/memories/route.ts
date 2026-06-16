import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const manifestPath = path.join(process.cwd(), "data", "memories-manifest.json");
let cached: unknown = null;
let cachedAt = 0;

export async function GET() {
  const now = Date.now();
  if (cached && now - cachedAt < 2000) {
    return NextResponse.json(cached);
  }

  const raw = fs.readFileSync(manifestPath, "utf8");
  cached = JSON.parse(raw);
  cachedAt = now;
  return NextResponse.json(cached);
}

