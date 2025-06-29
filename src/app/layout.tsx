import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Pingaroo',
    default: 'Pingaroo - The Reasoning Engine for Your App',
  },
  description: 'A hardened, production-ready API to classify any text against natural language rules. Stop parsing, start reasoning.',
  openGraph: {
    title: 'Pingaroo - The Reasoning Engine for Your App',
    description: 'The AI Text Classifier API that provides reliable, structured answers from any text with a simple, natural language prompt.',
    url: 'https://pingaroo.com',
    siteName: 'Pingaroo',
    images: [
      {
        url: 'https://pingaroo.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pingaroo - The Reasoning Engine for Your App',
    description: 'The AI Text Classifier API that provides reliable, structured answers from any text with a simple, natural language prompt.',
    creator: '@YourTwitterHandle',
    images: ['https://pingaroo.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
