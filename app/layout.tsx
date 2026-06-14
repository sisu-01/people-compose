import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import prisma from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "피플 컴포즈";
const DESCRIPTION = "기록 보관소";

export async function generateMetadata(): Promise<Metadata> {
  const imageRecord = await prisma.image.findUnique({
    where: { id: 1 },
  });
  const imageUrl = imageRecord?.url || '/default-og-image.jpg'; // 폴백 이미지 설정

  return {
    metadataBase: new URL('https://www.lol-updown.com'),
    alternates: {
      canonical: '/',
    },
    title: TITLE,
    description: DESCRIPTION,
    applicationName: TITLE,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: imageUrl,
      siteName: TITLE,
      type: "website",
    }
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold text-blue-600 tracking-tighter">
              P
            </Link>
            <Link href="/insert" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
              등록
            </Link>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}