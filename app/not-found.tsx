import Link from "next/link";
import Header from "./components/navigation/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="pb-2 text-label">الصفحة غير موجودة</h1>
        <Link
          href={"/matches"}
          className="text-white bg-primary px-3 py-2 rounded"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
