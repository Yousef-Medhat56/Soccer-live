import "./globals.css";
import { Cairo } from "next/font/google";
import Header from "./components/navigation/header";

const cairo = Cairo({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <body className="bg-background">
        <Header />
        {children}
      </body>
    </html>
  );
}
