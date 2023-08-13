"use client";
import { OptionTag } from "@/types/league/matches";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SelectRound({
  roundsArr,
  selectedRound,
}: {
  roundsArr: OptionTag[];
  selectedRound: { roundQueryStr: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedRoundId = searchParams.get("round");

  const handleChange = (roundId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("round", roundId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {roundsArr.length ? (
        <select
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={selectedRoundId || selectedRound.roundQueryStr}
          className={`${
            roundsArr && "max-w-[60%] md:max-w-full"
          } text-sm md:text-base px-1 md:px-2 md:py-1 outline outline-2 outline-stroke border-l-4 md:border-l-8 border-transparent rounded text-label`}
        >
          {roundsArr.map((round, index) => (
            <option key={index} value={`${round.queryStr}`}>
              {round.name}
            </option>
          ))}
        </select>
      ) : (
        <></>
      )}
    </>
  );
}
