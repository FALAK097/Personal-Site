import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StatsCard } from "@/components/stats/stats-card";

export const metadata = {
  title: "Stats",
  description:
    "See interesting stats about my coding activity and AI assistant usage, including most productive day, hour, language, and more.",
};

export default function StatsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-xl font-semibold mb-4">Stats</h1>
            <p className="text-md text-muted-foreground">
              Here are some interesting stats about my coding activity and AI
              assistant usage.
            </p>
          </div>
          <StatsCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
