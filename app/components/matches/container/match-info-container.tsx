"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MatchInfoConatiner({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const pathNameSplited = pathname.split("/");
  const lastPath = pathNameSplited[pathNameSplited.length - 1];

  const links = [
    { label: "التفاصيل", url: "details" },
    { label: "الإحصائيات", url: "stats" },
    { label: "الأحداث", url: "events" },
    { label: "التشكيل", url: "lineups" },
  ];
  return (
    <div className="w-full">
      <div
        className={`text-label text-sm md:text-base font-bold flex  justify-between md:justify-evenly border-stroke border-b-2 `}
      >
        {links.map((link) => (
          <Link
            key={link.url}
            href={`/matches/${id}/${link.url}`}
            className={`block rounded-t pb-2 md:py-2 md:px-4 ${
              link.url == lastPath &&
              "text-primary border-primary border-b-[2.5px] mb-[-2px]"
            } md:hover:bg-gray-100`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
