import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saham Akhirat",
  description: "A directory for akhirah rewards through developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <div className="min-h-screen flex flex-col">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
