import { NextRequest, NextResponse } from "next/server";

// Use Upstash Redis in production, JSON file locally
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

// --- File-based fallback for local dev ---
async function getWaitlistFile(): Promise<
  { email: string; timestamp: string; source: string }[]
> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const file = path.join(process.cwd(), "waitlist.json");
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveWaitlistFile(
  entries: { email: string; timestamp: string; source: string }[]
) {
  const fs = await import("fs/promises");
  const path = await import("path");
  const file = path.join(process.cwd(), "waitlist.json");
  await fs.writeFile(file, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.trim()?.toLowerCase();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    if (useRedis) {
      const redis = await getRedis();
      const exists = await redis.sismember("waitlist:emails", email);
      if (exists) {
        const total = await redis.scard("waitlist:emails");
        return NextResponse.json({
          message: "You're already on the list!",
          total,
        });
      }
      await redis.sadd("waitlist:emails", email);
      await redis.lpush(
        "waitlist:entries",
        JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: body.source || "landing",
        })
      );
      const total = await redis.scard("waitlist:emails");
      return NextResponse.json({
        message: "You're in!",
        position: total,
        total,
      });
    }

    // Local fallback
    const waitlist = await getWaitlistFile();

    if (waitlist.some((entry) => entry.email === email)) {
      return NextResponse.json({
        message: "You're already on the list!",
        position: waitlist.findIndex((e) => e.email === email) + 1,
        total: waitlist.length,
      });
    }

    waitlist.push({
      email,
      timestamp: new Date().toISOString(),
      source: body.source || "landing",
    });

    await saveWaitlistFile(waitlist);

    return NextResponse.json({
      message: "You're in!",
      position: waitlist.length,
      total: waitlist.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (useRedis) {
      const redis = await getRedis();
      const total = await redis.scard("waitlist:emails");
      return NextResponse.json({ total });
    }
    const waitlist = await getWaitlistFile();
    return NextResponse.json({ total: waitlist.length });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
