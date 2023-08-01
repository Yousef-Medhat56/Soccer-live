import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SelectLeague({
  leagues,
  filter,
}: {
  leagues: { id: string; name: string }[] | undefined;
  filter: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (leagueId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("league", leagueId);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={filter}
      className={`${
        leagues && "max-w-[60%] md:max-w-full"
      } text-sm md:text-base px-1 md:px-2 md:py-1 outline outline-2 outline-stroke border-l-4 md:border-l-8 border-transparent rounded text-label`}
    >
      <option value="all">كل البطولات</option>
      {leagues &&
        leagues.map((league: { id: string; name: string }) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
    </select>
  );
}
