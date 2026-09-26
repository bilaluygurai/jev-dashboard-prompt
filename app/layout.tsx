import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jev Karar Modeli",
  description: "Jev ile tipli karar sonuçları alın",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
