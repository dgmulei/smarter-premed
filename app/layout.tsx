import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smarter Pre-Med | Find Your Medical School Cohort",
  description: "Discover your competitive profile and ideal medical school cohort in 60 seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
