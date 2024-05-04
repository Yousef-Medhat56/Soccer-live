import { TopScorer } from "@/types/league/top-scorer";

import Link from "next/link";

export default function TopScorersTable({ players }: { players: TopScorer[] }) {
  const standingsTitles = ["club", "goals"];

  const standingsTitlesArabic = ["الفريق", "الأهداف"];

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
          {players.map((player, index) => (
            <tr key={index} className="h-[50px] md:h-16">
              {/* PLAYER CELL START  */}
              <td className="min-w-[140px] md:min-w-[170px] lg:min-w-[200px]">
                <div className="flex items-center">
                  <span className="text-primary inline-block w-[25px] ">{`${
                    index + 1
                  }`}</span>
                  <img
                    src={`https:${player.playerData.img}`}
                    alt={`${player.playerData.name}`}
                    height={36}
                    width={36}
                    className="max-h-9 rounded-full"
                  />
                  <span className=" pr-2 overflow-hidden text-sm md:text-base text-ellipsis whitespace-nowrap">
                    {player.playerData.name}
                  </span>
                </div>
              </td>
              {/* PLAYER CELL END  */}

              {/* CLUB CELL START  */}
              <td>
                <Link
                  href={`/club/${player.clubData.url}`}
                  className="flex justify-center text-sm max-w-[100px] md:max-w-[120px] py-[6px] px-2 bg-background rounded-xl"
                >
                  <img
                    src={`https:${player.clubData.img}`}
                    alt={`${player.clubData.name}`}
                    height={24}
                    width={24}
                    className="max-h-6"
                  />
                  <span className="pr-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {player.clubData.name}
                  </span>
                </Link>
              </td>
              {/* CLUB CELL END  */}

              <td className="text-center">{`${player.goalsNum}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
