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
      <body className="bg-background min-h-screen">
        <Header />
        {children}

        <footer
          dir="ltr"
          className="sticky top-[100vh] py-3 text-center shadow-sm border-t border-stroke bg-slate-50 flex flex-col"
        >
          <span className="text-label text-sm md:text-base">
            2023 Soccer Info
          </span>
          <span className="text-label text-sm md:text-base">
            Made with ❤️ by <span className="text-primary">Yousef Medhat</span>
            😉
          </span>
        </footer>
      </body>
    </html>
  );
}
