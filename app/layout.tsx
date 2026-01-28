import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Positioned | See Where You Stand",
  description: "Which med schools actually fit your profile? Positioned maps your strengths across 6 competencies and shows where you're built to stand out. Free, no account needed.",
  metadataBase: new URL("https://smarterpremed.com"),
  openGraph: {
    title: "Positioned | See Where You Stand",
    description: "Which med schools actually fit your profile? Positioned maps your strengths across 6 competencies and shows where you're built to stand out. Free, no account needed.",
    url: "https://smarterpremed.com",
    siteName: "Smarter Premed",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Positioned - See where you stand among med school types",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Positioned | See Where You Stand",
    description: "Which med schools actually fit your profile? Positioned maps your strengths across 6 competencies and shows where you're built to stand out. Free, no account needed.",
    images: ["/og-image.png"],
  },
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
