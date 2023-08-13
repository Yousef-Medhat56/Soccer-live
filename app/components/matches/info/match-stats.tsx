import { MatchStats } from "@/types/matches/stats";

export const revalidate = 60;
export default async function MatchStatsComp({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/stats`
  );
  const { data }: { data: MatchStats } = await response.json();

  //@ts-ignore
  const noStats = data.message ? true : false;

  const stats = [
    { name: "الاستحواذ", key: "possession" },
    { name: "التسديدات", key: "shots" },
    { name: "التسديدات على المرمى ", key: "targetShots" },
    { name: "التصديات", key: "saves" },
    { name: "الكروت الصفراء", key: "yellowCards" },
    { name: "الكروت الحمراء", key: "redCards" },
    { name: "الأخطاء", key: "fouls" },
    { name: "التسلل", key: "offside" },
  ];
  return (
    <div className="pt-6 flex flex-col items-center">
      {noStats ? (
        <h3 className="text-label">إحصائيات المباراة غير متوفرة</h3>
      ) : (
        stats.map((stat) => {
          // @ts-ignore
          const homeStat = data[stat.key].home;
          // @ts-ignore
          const awayStat = data[stat.key].away;

          const total = homeStat + awayStat;
          const homePercentage = total ? (homeStat / total) * 100 : 0;
          const awayPercentage = total ? 100 - homePercentage : 0;

          return (
            <div key={stat.key} className="py-2 text-center">
              <h3 className="font-bold text-label text-sm md:text-base">
                {stat.name}
              </h3>
              <div className="flex items-center justify-center my-1">
                <span className="text-primary font-bold">
                  {homeStat}
                  {stat.key == "possession" && "%"}
                </span>
                <div className="w-[60vw] md:w-[40vw] lg:w-[30vw] flex mx-3">
                  <div
                    className={`h-1 bg-primary rounded-r`}
                    style={{ width: `${homePercentage}%` }}
                  ></div>
                  <div
                    className={`h-1 bg-label rounded-l`}
                    style={{ width: `${awayPercentage}%` }}
                  ></div>
                </div>

                <span className="text-label font-bold">
                  {awayStat}
                  {stat.key == "possession" && "%"}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export const MatchStatsLoading = () => {
  return (
    <div className="pt-6 flex flex-col items-center animate-pulse">
      {[...Array(8)].map((key) => (
        <div key={key} className="flex flex-col items-center py-2">
          <div className="w-24 h-4 bg-gray-300 mb-1"></div>
          <div className=" my-2">
            <div className="w-[60vw] md:w-[40vw] lg:w-[30vw] h-2 flex mx-3 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
