import { NextResponse } from "next/server";

const useRedis = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function GET() {
  try {
    if (useRedis) {
      const redis = await getRedis();
      const total = await redis.scard("waitlist:emails");
      const raw = await redis.lrange("waitlist:entries", 0, -1);
      const entries = raw.map((r: unknown) => {
        if (typeof r === "string") return JSON.parse(r);
        return r;
      });
      return NextResponse.json({ entries, total });
    }

    // Local fallback
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const file = path.join(process.cwd(), "waitlist.json");
      const data = await fs.readFile(file, "utf-8");
      const entries = JSON.parse(data);
      return NextResponse.json({ entries, total: entries.length });
    } catch {
      return NextResponse.json({ entries: [], total: 0 });
    }
  } catch {
    return NextResponse.json({ entries: [], total: 0 });
  }
}
