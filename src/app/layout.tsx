import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demoing Use Cache",
  description: "SimpleSteps.guide demo of use cache in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
