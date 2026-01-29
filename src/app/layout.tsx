import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/ui/MouseGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Jul - Full Stack Developer | Portfolio",
  description: "Portfolio de Jul, développeur Full Stack spécialisé en React, Next.js, Python et Django. Découvrez mes projets innovants.",
  openGraph: {
    title: "Jul - Full Stack Developer",
    description: "Portfolio de Jul, développeur Full Stack spécialisé en React, Next.js, Python et Django.",
    images: ['/images/profile.jpeg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <MouseGlow />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
