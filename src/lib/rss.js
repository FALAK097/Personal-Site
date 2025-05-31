import fs from "fs";
import path from "path";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateRSSFeed(posts) {
  const websiteURL =
    process.env.NEXT_PUBLIC_WEBSITE_URL ||
    "https://personal-site-green-tau.vercel.app";
  const publicDir = path.join(process.cwd(), "public");
  const rssPath = path.join(publicDir, "rss.xml");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const websiteName = "Falak Gala's Blog";
  const websiteDescription = "Personal blog by Falak Gala";

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(websiteName)}</title>
    <description>${escapeXml(websiteDescription)}</description>
    <link>${websiteURL}</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-us</language>
    <atom:link href="${websiteURL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <guid isPermaLink="true">${websiteURL}/blog/${post.slug}</guid>
      <title>${escapeXml(post.title)}</title>
      <link>${websiteURL}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  try {
    fs.writeFileSync(rssPath, feed.trim());
    console.log("RSS feed generated at /public/rss.xml");
  } catch (error) {
    console.error("Error generating RSS feed:", error);
  }
}
