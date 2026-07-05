import type { Metadata } from "next";
import { wedding } from "@/config/wedding";
import "./globals.css";

export const metadata: Metadata = {
  title: `${wedding.coupleShort} | ${wedding.dateText}`,
  description: `${wedding.coupleLong} are getting married in ${wedding.location}, ${wedding.dateText}.`,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&family=Noto+Serif+TC:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
