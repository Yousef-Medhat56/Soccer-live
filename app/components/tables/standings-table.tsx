import { GroupStandings } from "@/types/league/standings";
import Image from "next/image";
import Link from "next/link";

export default function StandingsTable({ group }: { group: GroupStandings }) {
  const standingsTitles = [
    "matchesPlayed",
    "wins",
    "draws",
    "losses",
    "goalsFor",
    "goalsAgainst",
    "goalsDiff",
    "points",
  ];

  const standingsTitlesArabic = [
    "لعب",
    "فوز",
    "تعادل",
    "خسارة",
    "له",
    "عليه",
    "الفرق",
    "النقط",
  ];

  return (
    <div className="md:flex justify-center overflow-x-scroll md:overflow-x-auto mt-6 md:mt-8">
      <table className="table-auto">
        <thead>
          <tr className="text-sm">
            <th className="text-right">{group.groupName}</th>
            {standingsTitlesArabic.map((title, index) => (
              <th key={index} className="px-2 md:px-3">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-label">
          {group.standings.map((team, index) => (
            <tr key={index} className="h-10 md:h-12">
              <td className="min-w-[140px] md:min-w-[170px] lg:min-w-[200px]">
                <Link
                  href={`/club/${team.teamData.url}`}
                  className="flex items-center"
                >
                  <span className="text-primary inline-block w-[25px] ">{`${team.order}`}</span>
                  <Image
                    src={`${team.teamData.img}`}
                    alt={`${team.teamData.name}`}
                    height={24}
                    width={24}
                    className="max-h-6"
                  />
                  <span className=" pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {team.teamData.name}
                  </span>
                </Link>
              </td>
              {standingsTitles.map((title, index) => (
                <td key={index} className="text-center text-label">
                  {/* @ts-ignore  */}
                  {team[title]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
