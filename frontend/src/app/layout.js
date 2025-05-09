import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import embla css
import "./embla.css";

import ForsythTheme from "@/contexts/ThemeProvider";
import { AutoScrollProvider } from "@/contexts/AutoScrollContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forsyth Creations",
  description: "Created by Henry Forsyth, 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ForsythTheme>
          <AutoScrollProvider>{children}</AutoScrollProvider>
        </ForsythTheme>
      </body>
    </html>
  );
}
