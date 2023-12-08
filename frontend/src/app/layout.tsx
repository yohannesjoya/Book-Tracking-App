import type { Metadata } from "next";
import { ModeToggle } from "@/components/custom/theme-toggle";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


import { ThemeProvider } from "@/components/providers/theme-provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Tracker",
  description: "Book Tracker application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <body>{children}</body>
        <ModeToggle />
        <Toaster/>
      </ThemeProvider>
    </html>
  );
}
