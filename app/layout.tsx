// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/app/src/components/Navbar";
import Footer from "@/app/src/components/Footer";

export const metadata = {
  title: "Gisel Marién — Artistic Production House",
  description: "Artistic Production House for Contemporary Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 p-4">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
