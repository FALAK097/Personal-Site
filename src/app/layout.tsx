import type {Metadata} from "next";

import {Inter} from "next/font/google";
import React from "react";

import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "My spot on the web for writing, projects, and tutorials",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="min-h-screen bg-background p-4">
            <div className="rounded-lg border-2 border-border min-h-[calc(100vh-2rem)]">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
