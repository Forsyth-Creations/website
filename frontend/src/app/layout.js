import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import "./embla.css";

import ForsythTheme from "@/contexts/ThemeProvider";
import { AutoScrollProvider } from "@/contexts/AutoScrollContext";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata = {
  title: "Forsyth Creations",
  description:
    "Forsyth Creations LLC is a software development company specializing in web and mobile applications. The company is run by Henry Forsyth, with this site serving as a portfolio and blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <ForsythTheme>
          <AutoScrollProvider>{children}</AutoScrollProvider>
        </ForsythTheme>
      </body>
    </html>
  );
}
