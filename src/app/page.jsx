import { Navbar } from "@/components/navbar";
import { Profile } from "@/components/profile";
// import {Newsletter} from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { GitHubCalendarChart } from "@/components/github-calendar-chart";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="container flex-1 px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto space-y-16">
          <Profile />
          {/* <Newsletter /> */}
          <GitHubCalendarChart />
        </div>
      </main>
      <Footer />
    </div>
  );
}
