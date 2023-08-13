import { MatchHistoryDetails } from "@/types/matches/history-details";
import MatchCard from "../match-card";
import StandingsTable from "../../tables/standings-table";
import { LeagueMatchesLoading } from "../../leagues/container/league-matches";

interface MatchDetails extends MatchHistoryDetails {
  homeName: string;
  awayName: string;
}
export default async function MatchDetailsContainer({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/details`
  );
  const { data }: { data: MatchDetails } = await response.json();

  let noData = false;
  if (!data.homeLastMatches?.length && !data.awayLastMatches?.length)
    noData = true;
  return (
    <div className="pt-8 md:pt-10">
      {!noData ? (
        <>
          {/* F2F MATCHES START  */}
          {!!data.f2fHistory.total && (
            <div className="flex flex-col items-center pb-6">
              <h1 className="text-center text-label font-bold pb-5 text-base md:text-lg">
                تاريخ مواجهات {data.homeName} و{data.awayName}
              </h1>
              <div className="w-full lg:max-w-[80%]">
                <div className="grid grid-cols-3 text-center ">
                  <span className="text-primary">{data.homeName}</span>
                  <span className="text-label">
                    <span className="font-semibold">
                      {data.f2fHistory.total}
                    </span>{" "}
                    مباراة
                  </span>
                  <span className="text-red-400">{data.awayName}</span>
                </div>
                <div className="flex my-3">
                  <div
                    className={`h-1 bg-primary rounded-r`}
                    style={{
                      width: `${
                        (data.f2fHistory.homeWins / data.f2fHistory.total) * 100
                      }%`,
                    }}
                  ></div>
                  <div
                    className={`h-1 bg-gray-200`}
                    style={{
                      width: `${
                        (data.f2fHistory.draw / data.f2fHistory.total) * 100
                      }%`,
                    }}
                  ></div>
                  <div
                    className={`h-1 bg-red-400 rounded-l`}
                    style={{
                      width: `${
                        (data.f2fHistory.awayWins / data.f2fHistory.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 text-center text-label">
                  <span>
                    <span className="text-primary font-semibold">
                      {data.f2fHistory.homeWins}
                    </span>{" "}
                    فوز
                  </span>
                  <span>
                    <span className="text-label font-semibold">
                      {data.f2fHistory.draw}
                    </span>{" "}
                    تعادل
                  </span>
                  <span>
                    <span className="text-red-400 font-semibold">
                      {data.f2fHistory.awayWins}
                    </span>{" "}
                    فوز
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* F2F MATCHES END  */}

          {/* F2F MATCHES START  */}
          {!!data.f2fResults?.length && (
            <div className="pb-6">
              <h1 className="text-center text-label font-bold text-base md:text-lg">
                اخر مباريات بين {data.homeName} و{data.awayName}
              </h1>
              {data.f2fResults.map((match, index) => (
                <MatchCard match={match} key={index} showLeague showDate />
              ))}
            </div>
          )}
          {/* F2F MATCHES END  */}
          {/* F2F MATCHES START  */}
          {!!data.f2fBigWins?.length && (
            <div className="pb-6">
              <h1 className="text-center text-label font-bold   text-base md:text-lg">
                أكبر فوز
              </h1>
              {data.f2fBigWins.map((match, index) => (
                <MatchCard match={match} key={index} showLeague showDate />
              ))}
            </div>
          )}
          {/* F2F MATCHES START  */}
          {!!data.standings?.length && (
            <div className="pb-6">
              <h1 className="text-center text-label font-bold  text-base md:text-lg">
                ترتيب {data.homeName} و{data.awayName}
              </h1>
              {data.standings.map((group, index) => (
                <StandingsTable group={group} key={index} />
              ))}
            </div>
          )}
          {/* F2F MATCHES END  */}
          {/* F2F MATCHES START  */}
          {!!data.homeLastMatches?.length && (
            <div className="pb-6">
              <h1 className="text-center text-label font-bold text-base md:text-lg">
                اخر مباريات {data.homeName}
              </h1>
              {data.homeLastMatches.map((match, index) => (
                <MatchCard match={match} key={index} showLeague showDate />
              ))}
            </div>
          )}
          {/* F2F MATCHES END  */}
          {/* F2F MATCHES START  */}
          {!!data.awayLastMatches?.length && (
            <>
              <h1 className="text-center text-label font-bold text-base md:text-lg">
                اخر مباريات {data.awayName}
              </h1>
              {data.awayLastMatches.map((match, index) => (
                <MatchCard match={match} key={index} showLeague showDate />
              ))}
            </>
          )}
          {/* F2F MATCHES END  */}
        </>
      ) : (
        <h2 className="text-label text-center">تفاصيل المباراة غير متوفرة</h2>
      )}
    </div>
  );
}

export const MatchDetailsContainerLoading = () => {
  return (
    <div className="pt-6">
      <div className="animate animate-pulse flex flex-col items-center pt-2">
        <div className="w-24 h-4 bg-gray-300 mb-1"></div>
        <div className=" mt-3">
          <div className="w-[75vw] md:w-[60vw] lg:w-[45vw] h-2 flex mx-3 bg-gray-300"></div>
        </div>
      </div>
      <LeagueMatchesLoading />
    </div>
  );
};
