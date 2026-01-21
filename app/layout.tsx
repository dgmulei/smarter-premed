import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Positioned by Smarter Premed | Medical School Assessment",
  description: "See where you stand. Focus on what matters. Free 10-minute assessment analyzing your strengths across 6 core competencies and 5 school types.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div
          style={{
            paddingTop: 'calc(40px + env(safe-area-inset-top, 0px))'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
