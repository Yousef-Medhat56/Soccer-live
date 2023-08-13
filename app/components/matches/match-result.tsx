import { MatchResults, TeamResults } from "@/types/matches/results";
import PitchIcon from "../../../public/icons/pitch.svg";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ClubInMatchLoading } from "./match-card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MatchResultCard({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/results`,
    { cache: "no-cache" }
  );

  if (response.status == 404) notFound();
  const { data }: { data: MatchResults } = await response.json();

  return (
    <div>
      <h1 className="text-xl font-bold text-center pb-4">
        <Link href={`/leagues/${data.league.url}`}>{data.league.name}</Link>
      </h1>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-start border-stroke border-b-2 pb-3 md:px-4">
          <ClubInMatchResult club={data.home} isHome />
          {/* Match STATUS AND SCORE START  */}
          <div className="flex flex-col items-center mt-8 md:mt-6">
            <div className="flex items-center  mx-3 lg:mx-12">
              <span className="font-bold text-xl md:text-2xl  text-primary">
                {data.home.goals}
              </span>
              <span className="font-bold text-center text-base md:text-xl text-label mx-3 md:mx-6">
                {data.status}
              </span>
              <span className="font-bold text-xl md:text-2xl text-primary">
                {data.away.goals}
              </span>
            </div>
          </div>
          {/* Match STATUS AND SCORE END  */}
          <ClubInMatchResult club={data.away} isHome={false} />
        </div>

        {/* MATCH INFO START  */}
        <div className="mx-2 md:mx-0 grid grid-cols-2 md:grid-cols-3 justify-items-start md:justify-items-center items-start text-label pt-3 text-sm md:text-base gap-y-4 gap-x-5 md:gap-x-0">
          {data.info.matchDate && (
            <div className="flex items-center">
              <CalendarDaysIcon className="w-8 md:w-7 text-primary pl-1" />{" "}
              <span>{data.info.matchDate}</span>
            </div>
          )}
          {data.info.matchTime && (
            <div className="flex items-center ">
              <ClockIcon className="w-7 text-primary pl-1" />{" "}
              <span>{data.info.matchTime}</span>
            </div>
          )}
          {data.info.stadium && (
            <div className="flex items-center ">
              <div className="pl-2">
                <Image
                  src={PitchIcon}
                  alt="pitch icon"
                  width={20}
                  height={24}
                />
              </div>
              <span className="max-w-[80%] md:max-w-max">
                {data.info.stadium}
              </span>
            </div>
          )}
        </div>
        {/* MATCH INFO END  */}
      </div>
    </div>
  );
}

const ClubInMatchResult = ({
  club,
  isHome,
}: {
  club: TeamResults;
  isHome: boolean;
}) => {
  return (
    <div className="flex flex-col w-[100px] md:w-[auto] md:flex-1">
      <Link
        href={`/club/${club.url!}`}
        className={`flex items-center  ${
          isHome
            ? "flex-col md:flex-row-reverse justify-start"
            : "flex-col md:flex-row"
        }`}
      >
        <Image
          src={club.img!}
          alt={club.name}
          width={75}
          height={75}
          className="w-[60px] md:w-[75px] mb-2 md:mb-0"
        />
        <h2
          className={`text-base md:text-xl font-bold text-center ${
            isHome ? "pl-2" : "pr-2"
          }`}
        >
          {club.name}
        </h2>
      </Link>
      <div className="flex flex-col mt-4">
        {club.scorers?.map((scorer) => (
          <div
            key={scorer.time}
            className={`flex text-label font-bold text-base py-1 justify-end items-center ${
              !isHome && "flex-row-reverse"
            }`}
          >
            <h3 className="text-sm md:text-base">{scorer.name} </h3>
            <span className={`text-primary ${isHome ? "pr-1" : "pl-1"}`}>
              {scorer.time}{" "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MatchResultCardLoading = () => {
  return (
    <div className="flex items-center flex-col animate-pulse">
      <div className="bg-gray-300 w-28 h-6 mb-4"></div>
      <div className="flex flex-row justify-between md:justify-around items-center w-full">
        <ClubInMatchLoading isHome />
        <ClubInMatchLoading isHome={false} />
      </div>
    </div>
  );
};
