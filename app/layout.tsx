import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#fdf8f9",
};

export const metadata: Metadata = {
  title: "Sparsha — Move Freely. Live Fully. | Premium Feminine Wellness",
  description:
    "Comfort that keeps up with every move. Experience 100% rash-free, ultra-soft sanitary napkins designed for modern active women. Swasth Mahila, Swasth Bharat.",
  icons: {
    icon: "/assets/sparsha-logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/frames/ezgif-frame-001.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdf8f9] text-[#281920]">
        {children}
      </body>
    </html>
  );
}
