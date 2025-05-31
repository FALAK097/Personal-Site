import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { CircleBackground } from "@/components/circle-background";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Personal Portfolio",
  description: "My spot on the web for writing, projects, and tutorials",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning lang="en" className={GeistSans.className}>
        <body suppressHydrationWarning>
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            enableSystem={true}
          >
            <CircleBackground />
            <div className="min-h-screen p-4 bg-background/50">
              <div className="rounded-lg border-2 border-border min-h-[calc(100vh-2rem)]">
                {children}
              </div>
            </div>
            <ScrollProgress />
            <Toaster />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
