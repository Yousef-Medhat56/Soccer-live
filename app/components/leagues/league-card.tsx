import { LeagueLink } from "@/types/league/league";
import Image from "next/image";
import Link from "next/link";

export default function LeagueCard({ league }: { league: LeagueLink }) {
  return (
    <Link href={`/leagues/${league.url}`}>
      <div className="flex flex-col items-center justify-between px-3 py-4 bg-background rounded border-2 border-transparent hover:border-stroke hover:bg-white duration-300">
        <Image
          src={`${league.img!}`}
          alt={`${league.name!}`}
          height={70}
          width={70}
        />
        <h3 className="font-bold text-label pt-3 text-center text-sm md:text-base">{league.name}</h3>
      </div>
    </Link>
  );
}

export const LeagueCardLoading = () => {
  return (
    <div className="flex flex-col items-center justify-between px-3 py-4 bg-gray-200 rounded animate-pulse">
      <div className="w-[70px] h-[70px] bg-gray-300 rounded-full" />
      <div className="mt-3 h-4 w-16 bg-gray-300"></div>
    </div>
  );
};
