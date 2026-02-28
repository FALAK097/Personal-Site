"use server";

export async function getBookmarks() {
  const token = process.env.RAINDROP_API_TOKEN;
  const collectionId = process.env.RAINDROP_COLLECTION_ID;
  let allItems = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=50&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch bookmarks");

    const data = await res.json();
    allItems = [...allItems, ...data.items];

    if (data.items.length < 50) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allItems.map((item) => ({
    id: item._id,
    title: item.title,
    link: item.link,
    tags: item.tags,
    excerpt: item.excerpt,
    cover: item.cover,
  }));
}
