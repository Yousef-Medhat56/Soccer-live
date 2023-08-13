"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClubInfoContainer({
  id,
  slug,
  children,
}: {
  id: string;
  slug: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const pathNameSplited = pathname.split("/");
  const lastPath = pathNameSplited[pathNameSplited.length - 1];

  const links = [
    { label: "المباريات", url: "matches" },
    { label: "اللاعبين", url: "squad" },
    { label: "معلومات", url: "info" },
  ];

  return (
    <div className="w-full">
      <div
        className={`text-label text-sm md:text-base font-bold flex  justify-around md:justify-evenly border-stroke border-b-2 `}
      >
        {links.map((link) => (
          <Link
            key={link.url}
            href={`/club/${id}/${slug}/${link.url}`}
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
