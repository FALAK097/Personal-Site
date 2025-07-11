---
url: <https://falakgala.dev/blog/tracking-unique-visitors>
title: "Building a Unique Visitors Counter with Upstash Redis and Next.js Server Actions | Falak Gala's Blog | Falak Gala's Portfolio"
---

[Back to Blog](https://falakgala.dev/blog)

# Building a Unique Visitors Counter with Upstash Redis and Next.js Server Actions

May 20, 2025•3 min read

Tracking how many unique visitors your website receives can be both insightful and privacy-conscious — without using Google Analytics. This guide shows you how to build a unique visitor counter using Upstash Redis and Next.js Server Actions, ideal for personal sites and blogs.

### Installation

```
npm install @upstash/redis zod
```

### File Structure

```
├── app/
│   └── actions/
│       └── unique-visitors.js
├── components/
│   └── footer.jsx
├── .env
```

### Architecture Overview

The system has three main pieces:

1. Redis Set – stores unique visitor IDs
2. Server Action – handles counting and caching logic
3. Client Component – displays the visitor count in the UI

### Setting Up Upstash Redis

Sign up at Upstash and create a Redis database and add the following variables to your **.env**:

```
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### Server Action Logic

This function tracks visitors by storing a **visitorId** in a Redis Set and caching the count for performance.

```
"use server";

import { z } from "zod";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const UniqueVisitorSchema = z.object({
  visitorId: z.string().min(1).max(100),
});

const UNIQUE_VISITORS_KEY = "site:unique_visitors";
const UNIQUE_VISITORS_COUNT_KEY = "site:unique_visitors_count";
const CACHE_TTL_SECONDS = 60;

export async function uniqueVisitors(visitorId) {
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
}
```

### Client Component

Generate a stable visitor ID using localStorage:

```
function generateVisitorId() {
  const key = "visitorId";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
```

### Displaying the Visitor Count

Here is the important logic to call the server action and show the count:

```
import { useEffect, useState } from "react";
import { uniqueVisitors } from "@/actions/unique-visitors";

export function MyComponent() {
  const [uniqueVisitorsCount, setUniqueVisitorsCount] = useState(null);

  useEffect(() => {
    const visitorId = generateVisitorId();
    const fetchUniqueVisitors = async () => {
      const result = await uniqueVisitors(visitorId);
      if (result?.uniqueVisitors) {
        setUniqueVisitorsCount(result.uniqueVisitors);
      }
    };
    fetchUniqueVisitors();
  }, []);

  return (
    <div>
      {uniqueVisitorsCount !== null
        ? `${uniqueVisitorsCount.toLocaleString()} Unique Visitors`
        : "Loading visitors..."}
    </div>
  );
}
```

### Performance Considerations

1. Caching with Redis: results are stored for 60 seconds to reduce read operations
2. Visitor ID with localStorage: prevents double-counting repeat visits
3. Redis Sets: efficient structure for tracking uniqueness

### Privacy Considerations

1. No personal identifiers are stored
2. Random UUIDs are used for anonymity
3. No tracking scripts, cookies, or analytics SDKs

### Conclusion

With just a few simple components, you can add a lightweight, privacy-conscious visitor counter to your Next.js site. This method is scalable, free under Upstash’s generous limits, and doesn’t compromise user privacy.

[View Source](https://github.com/Falak097/Personal-Site)
Feel free to adapt this solution for your own projects, and let me know if you have any questions or need further assistance!

Enjoyed this article? Share it with your network!
