export const dynamic = "force-dynamic";

import { Navbar } from "@/components/navbar";
import { Profile } from "@/components/profile";
import { Footer } from "@/components/footer";
import { GitHubCalendarChart } from "@/components/custom/github-calendar-chart";
import { RecentPosts } from "@/components/blog/recent-posts";
import { getAllPosts } from "@/lib/mdx";
import { getNowPlaying } from "@/actions/spotify";
import { SpotifyNowPlaying } from "@/components/custom/spotify-now-playing";

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  let spotifyData;

  try {
    spotifyData = await getNowPlaying();
  } catch (error) {
    console.error("Failed to fetch Spotify data:", error);
    spotifyData = null;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <div className="ml-5 mt-5">
        <SpotifyNowPlaying songData={spotifyData} />
      </div>
      <main className="container flex-1 px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto space-y-16">
          <Profile />
          <RecentPosts posts={recentPosts} />
          <GitHubCalendarChart />
        </div>
      </main>
      <Footer />
    </div>
  );
}
