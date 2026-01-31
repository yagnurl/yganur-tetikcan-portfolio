import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yağnur Tetikcan | Frontend Developer & Designer",
  description: "Frontend developer with a keen eye for design and a strong interest in product design. Creating visually stunning digital experiences using Next.js and Nuxt.js.",
  keywords: ["frontend developer", "web developer", "Next.js", "Nuxt.js", "product design", "UI/UX", "portfolio", "Yağnur Tetikcan"],
  authors: [{ name: "Yağnur Tetikcan" }],
  creator: "Yağnur Tetikcan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yagnurtetikcan.com",
    title: "Yağnur Tetikcan | Frontend Developer & Designer",
    description: "Frontend developer with a keen eye for design and a strong interest in product design. Creating visually stunning digital experiences using Next.js and Nuxt.js.",
    siteName: "Yağnur Tetikcan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yağnur Tetikcan | Frontend Developer & Designer",
    description: "Frontend developer with a keen eye for design and a strong interest in product design. Creating visually stunning digital experiences using Next.js and Nuxt.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
