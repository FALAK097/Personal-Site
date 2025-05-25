import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Personal Portfolio",
  description: "My spot on the web for writing, projects, and tutorials",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className={GeistSans.className}>
      <body suppressHydrationWarning>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          enableSystem={true}
        >
          <div className="min-h-screen p-4 bg-background">
            <div className="rounded-lg border-2 border-border min-h-[calc(100vh-2rem)]">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
