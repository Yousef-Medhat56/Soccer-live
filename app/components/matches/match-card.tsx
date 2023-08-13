import { Match, TeamInMatch } from "@/types/matches/match";
import Image from "next/image";
import Link from "next/link";

export default function MatchCard({
  match,
  showDate = false,
  showHour = false,
  showTime = false,
  showLeague = false,
}: {
  match: Match;
  showDate?: boolean;
  showHour?: boolean;
  showTime?: boolean;
  showLeague?: boolean;
}) {
  const matchStatus = {
    "not started": { text: "لم تبدأ", color: "bg-primary" },
    live: { text: "مباشر", color: "bg-[#955050]" },
    finished: { text: "انتهت", color: "bg-[#9E9E9E]" },
  };

  let matchStatusText;
  let matchStatusColor;

  if (match.status) {
    /* @ts-ignore */
    matchStatusText = matchStatus[match.status].text;
    /* @ts-ignore */
    matchStatusColor = matchStatus[match.status].color;
  }

  let matchHour;
  if (!showTime && match.time) {
    const matchTimeSplited = match.time.split(" ");
    matchHour =
      matchTimeSplited[matchTimeSplited.length - 2] +
      " " +
      matchTimeSplited[matchTimeSplited.length - 1];

    match.time = match.time.replace(matchHour, "");
  }

  return (
    <div className="bg-background py-3 px-1 md:px-0 mt-4 ">
      {showLeague && (
        <h2 className="text-center font-bold text-sm md:text-base md:pb-2">
          {match.league}
        </h2>
      )}
      <div className="flex items-center justify-center">
        {/* CLUB START  */}
        <ClubInMatch club={match.home} isHome={true} />
        {/* CLUB END  */}

        {/* SCORE START  */}
        {match.id ? (
          <Link href={`/matches/${match.id}/details`}>
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-primary mr-3 md:mr-5">
                  {match.home.goals ? match.home.goals : "-"}
                </h3>

                <div className="flex flex-col mx-4 items-center justify-between">
                  {match.status && (
                    <span
                      className={`${matchStatusColor} text-white font-light text-sm px-4 py-1 mx-2 md:mx-4 text-center whitespace-nowrap`}
                    >
                      {matchStatusText}
                    </span>
                  )}

                  {showDate && (
                    <span className="text-label text-sm md:text-base pt-2 text-center">
                      {match.time}
                    </span>
                  )}
                  {showHour && (
                    <span className="text-label text-sm md:text-base pt-1 text-center">
                      {matchHour}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-primary ml-3 md:ml-5">
                  {match.away.goals ? match.away.goals : "-"}
                </h3>
              </div>
              {match.status == "not started" && match.time && showTime && (
                <span className="text-label pt-2">{match.time}</span>
              )}
            </div>
          </Link>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-primary mr-3 md:mr-5">
                  {match.home.goals ? match.home.goals : "-"}
                </h3>

                <div className="flex flex-col mx-4 items-center justify-between">
                  {match.status && (
                    <span
                      className={`${matchStatusColor} text-white font-light text-sm px-4 py-1 mx-2 md:mx-4 text-center whitespace-nowrap`}
                    >
                      {matchStatusText}
                    </span>
                  )}

                  {showDate && (
                    <span className="text-label text-sm md:text-base pt-2 text-center">
                      {match.time}
                    </span>
                  )}
                  {showHour && (
                    <span className="text-label text-sm md:text-base pt-1 text-center">
                      {matchHour}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-primary ml-3 md:ml-5">
                  {match.away.goals ? match.away.goals : "-"}
                </h3>
              </div>
              {match.status == "not started" && match.time && showTime && (
                <span className="text-label pt-2">{match.time}</span>
              )}
            </div>
          </div>
        )}

        {/* SCORE END  */}

        {/* CLUB START  */}
        <ClubInMatch club={match.away} isHome={false} />
        {/* CLUB END  */}
      </div>
    </div>
  );
}

export const MatchCardLoading = () => {
  return (
    <div className="bg-background py-3 px-1 md:px-0 mt-4 flex items-center justify-center ">
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
          <h3 className="font-bold text-xs md:text-base px-2 text-center mt-2 md:mt-0">
            {club.name}
          </h3>
          <Image
            src={club.img!}
            alt={club.name}
            width={60}
            height={60}
            className="w-[45px] md:w-[60px]"
          />
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
