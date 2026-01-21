import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body>
        <Header />
        <div className="pt-[40px] pb-[40px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
