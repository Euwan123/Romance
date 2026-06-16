import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const manifestPath = path.join(process.cwd(), "data", "galleries-manifest.json");
let cached: unknown = null;
let cachedAt = 0;

export async function GET(request: NextRequest) {
  const now = Date.now();
  const albumId = request.nextUrl.searchParams.get("album");

  if (!cached || now - cachedAt > 2000) {
    const raw = fs.readFileSync(manifestPath, "utf8");
    cached = JSON.parse(raw);
    cachedAt = now;
  }

  const data = cached as { albums: Array<{ id: string }> };

  if (albumId) {
    const album = data.albums.find((a) => a.id === albumId);
    return NextResponse.json(album ?? { photos: [] });
  }

  return NextResponse.json(cached);
}
