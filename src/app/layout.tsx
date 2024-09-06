import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../utils/ClientWrapper"; // Import the client-side wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-MAK Corporation",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
