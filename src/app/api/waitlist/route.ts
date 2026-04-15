import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

async function getWaitlist(): Promise<
  { email: string; timestamp: string; source: string }[]
> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveWaitlist(
  entries: { email: string; timestamp: string; source: string }[]
) {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
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

    const waitlist = await getWaitlist();

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

    await saveWaitlist(waitlist);

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
  const waitlist = await getWaitlist();
  return NextResponse.json({ total: waitlist.length });
}
