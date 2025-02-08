import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

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
        <script defer src="https://cloud.umami.is/script.js" data-website-id="824d5511-2dfe-438c-9565-a69f6679bafc"></script>
      </body>
    </html>
  );
}
