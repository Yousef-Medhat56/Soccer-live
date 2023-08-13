"use client";
import { OptionTag } from "@/types/league/matches";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function FilterMatchesButton({
  isPrevious,
  children,
}: {
  isPrevious: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleClick = () => {
    if (isPrevious) {
      params.set("previous", "true");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.set("previous", "false");
      router.push(`${pathname}?${params.toString()}`);
    }
  };
  return <button onClick={handleClick}>{children}</button>;
}
