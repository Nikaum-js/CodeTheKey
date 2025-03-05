import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Code The Key",
  description: "Code The Key é uma plataforma para aprender e compartilhar código.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
