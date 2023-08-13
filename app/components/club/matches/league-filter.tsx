"use client";
import { OptionTag } from "@/types/league/matches";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SelectClubMatchesLeague({
  leagues,
}: {
  leagues: OptionTag[] | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  let filter = params.get("league") || "";
  if (filter)
    if (!isLeagueValid(leagues!, filter)) {
      params.delete("league");
      router.push(`${pathname}?${params.toString()}`);
    }
  const handleChange = (leagueId: string) => {
    params.set("league", leagueId);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={filter}
      className={`${
        leagues && "max-w-[40%] md:max-w-full"
      } text-sm md:text-base px-1 md:px-2 md:py-1 outline outline-2 outline-stroke border-l-4 md:border-l-8 border-transparent rounded text-label`}
    >
      <option value="all">كل البطولات</option>
      {leagues &&
        leagues.map((league, index) => (
          <option key={index} value={`${league.name}`}>
            {league.name}
          </option>
        ))}
    </select>
  );
}

const isLeagueValid = (leaguesArr: OptionTag[], leagueName: string) => {
  if (leagueName == "all") return true;
  return leaguesArr.some((el) => el.name === leagueName);
};
