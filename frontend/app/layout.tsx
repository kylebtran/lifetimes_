import type { Metadata } from "next";
import { Zilla_Slab, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-zilla-slab",
  weight: ["300", "400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: [],
});

export const metadata: Metadata = {
  title: "Lifetimes_",
  description: "[PLACEHOLDER]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${zillaSlab.variable} antialiased`}>
        <UserProvider>
          <ClientProvider>{children}</ClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
