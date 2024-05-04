import { PlayerInSquad } from "@/types/club/player";
import { differenceInYears } from "date-fns";

import Link from "next/link";

export default function SquadTable({
  squad,
  isNationalTeam,
}: {
  squad: PlayerInSquad[];
  isNationalTeam: boolean;
}) {
  const standingsTitles = ["nationality", "position", "birthDate"];

  const standingsTitlesArabic = ["الجنسية", "المركز", "العمر"];

  if (isNationalTeam) {
    standingsTitles[0] = "club";
    standingsTitlesArabic[0] = "الفريق";
  }
  return (
    <div className="md:flex justify-center overflow-x-scroll md:overflow-x-auto mt-6 md:mt-8">
      <table className="table-auto">
        <thead>
          <tr className="text-sm">
            <th className="text-right">اللاعب</th>
            {standingsTitlesArabic.map((title, index) => (
              <th key={index} className="px-2 md:px-8">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-label">
          {squad.map((player, index) => (
            <tr key={index} className="h-[50px] md:h-16">
              {/* PLAYER CELL START  */}
              <td className="min-w-[140px] md:min-w-[170px] lg:min-w-[200px]">
                <div className="flex items-center">
                  <span className="text-primary inline-block w-[25px] ">{`${
                    index + 1
                  }`}</span>
                  <img
                    src={`${player.img}`}
                    alt={`${player.name}`}
                    height={36}
                    width={36}
                    className="max-h-9 rounded-full"
                  />
                  <span className=" pr-2 overflow-hidden text-sm md:text-base text-ellipsis whitespace-nowrap">
                    {player.name}
                  </span>
                </div>
              </td>
              {/* PLAYER CELL END  */}
              {standingsTitles.map((key) => {
                // @ts-ignore
                const value = player[key];
                const isPlayerAgeCell = key == "birthDate";
                let playerAge = 0;
                if (isPlayerAgeCell && player.birthDate) {
                  playerAge = differenceInYears(
                    new Date(),
                    new Date(player.birthDate)
                  );
                }

                return (
                  <td className="text-center text-sm md:text-base" key={key}>
                    {isPlayerAgeCell ? (playerAge ? playerAge : "-") : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
