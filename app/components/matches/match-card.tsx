import { Match, TeamInMatch } from "@/types/matches/match";
import Image from "next/image";
import Link from "next/link";

export default function MatchCard({ match }: { match: Match }) {
  const matchStatus = {
    "not started": { text: "لم تبدأ", color: "bg-primary" },
    live: { text: "مباشر", color: "bg-[#955050]" },
    finished: { text: "انتهت", color: "bg-[#9E9E9E]" },
  };

  /* @ts-ignore */
  const matchStatusText = matchStatus[match.status].text;
  /* @ts-ignore */
  const matchStatusColor = matchStatus[match.status].color;

  return (
    <div className="bg-background py-3 mt-4 flex items-center justify-center">
      {/* CLUB START  */}
      <ClubInMatch club={match.home} isHome={true} />
      {/* CLUB END  */}

      {/* SCORE START  */}
      <Link href={`/matches/${match.id}/details`}>
        <div className="flex flex-col items-center justify-between">
          <div className="flex">
            <h3 className="text-2xl font-bold text-primary mr-5">
              {match.home.goals ? match.home.goals : "-"}
            </h3>

            <span
              className={`${matchStatusColor} text-white font-light text-sm px-4 py-1 mx-4 text-center`}
            >
              {matchStatusText}
            </span>
            <h3 className="text-2xl font-bold text-primary ml-5">
              {match.away.goals ? match.away.goals : "-"}
            </h3>
          </div>
          {match.status == "not started" && match.time && (
            <span className="text-label pt-2">{match.time}</span>
          )}
        </div>
      </Link>
      {/* SCORE END  */}

      {/* CLUB START  */}
      <ClubInMatch club={match.away} isHome={false} />
      {/* CLUB END  */}
    </div>
  );
}

export const MatchCardLoading = () => {
  return (
    <div className="bg-background py-3 mt-4 flex items-center justify-center ">
      <ClubInMatchLoading isHome />
      <div className="w-16 h-6 bg-gray-300 mx-12"></div>
      <ClubInMatchLoading isHome={false} />
    </div>
  );
};

export const ClubInMatch = ({
  club,
  isHome,
}: {
  club: TeamInMatch;
  isHome: boolean;
}) => {
  return (
    <div className="w-[25%] md:w-[30%]">
      <Link href={`/club/${club.url}`}>
        <div
          className={`flex  justify-end items-center py-2 ${
            isHome
              ? "flex-col-reverse md:flex-row"
              : "flex-col-reverse md:flex-row-reverse"
          }`}
        >
          <h3 className="font-bold text-sm md:text-base px-2 text-center mt-2 md:mt-0">
            {club.name}
          </h3>
          <Image src={club.img!} alt={club.name} width={60} height={60} />
        </div>
      </Link>
    </div>
  );
};

export const ClubInMatchLoading = ({ isHome }: { isHome: boolean }) => {
  return (
    <div className="w-[25%] md:w-[30%]">
      <div
        className={`flex  justify-end items-center py-2 ${
          isHome
            ? "flex-col-reverse md:flex-row"
            : "flex-col-reverse md:flex-row-reverse"
        }`}
      >
        <div
          className={`w-16 h-6 bg-gray-300 mx-0 ${
            isHome ? "md:ml-3" : "md:mr-3"
          } mt-4 md:mt-0`}
        ></div>
        <div className="w-[70px] h-[70px] rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};
