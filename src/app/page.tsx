import {Navbar} from "@/components/navbar";
import {Profile} from "@/components/profile";
import {Newsletter} from "@/components/newsletter";
import {Footer} from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-16">
          <Profile />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
