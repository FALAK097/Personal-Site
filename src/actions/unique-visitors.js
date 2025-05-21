"use server";

import { z } from "zod";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const UniqueVisitorSchema = z.object({
  visitorId: z
    .string()
    .min(1, "visitorId is required")
    .max(100, "visitorId is too long"),
});

const UNIQUE_VISITORS_KEY = "site:unique_visitors";
const UNIQUE_VISITORS_COUNT_KEY = "site:unique_visitors_count";
const CACHE_TTL_SECONDS = 60;

export async function uniqueVisitors(visitorId) {
  try {
    const validated = UniqueVisitorSchema.safeParse({ visitorId });
    if (!validated.success) {
      return { error: validated.error.issues[0].message };
    }

    const cachedCount = await redis.get(UNIQUE_VISITORS_COUNT_KEY);
    if (cachedCount !== null) {
      return { uniqueVisitors: Number(cachedCount) };
    }

    const isMember = await redis.sismember(UNIQUE_VISITORS_KEY, visitorId);

    if (!isMember) {
      await redis.sadd(UNIQUE_VISITORS_KEY, visitorId);
    }

    const count = await redis.scard(UNIQUE_VISITORS_KEY);

    await redis.set(UNIQUE_VISITORS_COUNT_KEY, count, {
      ex: CACHE_TTL_SECONDS,
    });

    return { uniqueVisitors: count };
  } catch (error) {
    console.error("Error in uniqueVisitors server action:", {
      message: error.message,
    });

    return { error: "Failed to track unique visitors" };
  }
}
