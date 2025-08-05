import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import embla css
import "./embla.css";

import ForsythTheme from "@/contexts/ThemeProvider";
import { AutoScrollProvider } from "@/contexts/AutoScrollContext";
import Head from "next/head";

export const metadata = {
  title: "Forsyth Creations",
  description: "Forsyth Creations LLC is a software development company specializing in web and mobile applications. The company is run by Henry Forsyth, with this site serving as a portfolio and blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <ForsythTheme>
          <AutoScrollProvider>{children}</AutoScrollProvider>
        </ForsythTheme>
      </body>
    </html>
  );
}
