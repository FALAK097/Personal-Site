import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const UNIQUE_VISITORS_KEY = "site:unique_visitors";
const UNIQUE_VISITORS_COUNT_KEY = "site:unique_visitors_count";
const CACHE_TTL_SECONDS = 60;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const visitorId = searchParams.get("visitorId");

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
    }

    let cachedCount = await redis.get(UNIQUE_VISITORS_COUNT_KEY);
    if (cachedCount !== null) {
      return NextResponse.json({ uniqueVisitors: Number(cachedCount) });
    }

    const isMember = await redis.sismember(UNIQUE_VISITORS_KEY, visitorId);

    if (!isMember) {
      await redis.sadd(UNIQUE_VISITORS_KEY, visitorId);
    }

    const count = await redis.scard(UNIQUE_VISITORS_KEY);

    await redis.set(UNIQUE_VISITORS_COUNT_KEY, count, {
      ex: CACHE_TTL_SECONDS,
    });

    return NextResponse.json({ uniqueVisitors: count });
  } catch (error) {
    console.error("Error in views API:", error);
    return NextResponse.json(
      { error: "Failed to get unique visitors" },
      { status: 500 }
    );
  }
}
