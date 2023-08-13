import { ClubDetails } from "@/types/club/club";
import { TrophyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ClubInfoComp({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/club/${id}/${slug}/info`,
    { next: { revalidate: 60 } }
  );

  const {
    data: { clubDetails },
  }: { data: { clubDetails: ClubDetails } } = await response.json();

  const clubDetailsKeys = ["country", "manager", "foundationYear", "stadium"];
  const clubDetailsKeysInArabic = [
    "البلد",
    "المدير الفني",
    "تاريخ التأسيس",
    "الملعب",
  ];
  let valuesNum = 0;
  return (
    <div className="flex flex-col items-center justify-center mt-4 w-fit">
      <div>
        {clubDetailsKeys.map((key, index) => {
          // @ts-ignore
          const value = clubDetails[key];
          if (value) valuesNum++;

          return (
            <div key={key}>
              {value && (
                <h2 className="flex justify-between px-6 md:px-8 pb-2 pt-4 border-b-2 border-stroke">
                  <span className="text-sm md:text-base font-bold pl-3 text-center w-max">
                    {clubDetailsKeysInArabic[index]}{" "}
                  </span>
                  <span className="min-w-[100px] max-w-[170px] md:max-w-max overflow-hidden text-ellipsis whitespace-nowrap text-center text-label">
                    {value}{" "}
                  </span>
                </h2>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full px-6 md:px-8">
        {clubDetails.participatingLeagues.length ? (
          <div>
            <h2 className="pt-6 font-bold text-sm md:text-base">
              البطولات التي يشارك بها
            </h2>
            <div className="text-label">
              {clubDetails.participatingLeagues.map((league, index) => (
                <Link
                  className="flex pt-3 md:pt-4 text-sm md:text-base"
                  href={`/leagues/${league.url}/standings`}
                  key={index}
                >
                  <TrophyIcon className="w-6 text-primary" />
                  <span className="pr-2">{league.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {valuesNum == 0 && <h2 className="text-label">لا يوجد معلومات متوفرة</h2>}
    </div>
  );
}

export const ClubInfoCompLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 animate-pulse">
      <div>
        {[...Array(4)].map((key) => (
          <div
            key={key}
            className="h-8 w-60 bg-white my-4 border-b-2 border-stroke pb-2 px-6 md:px-8"
          >
            <div className="h-full w-16 bg-background rounded"></div>
          </div>
        ))}
      </div>
      <div className="w-full px-6 md:px-8">
        <div>
          <div className="mt-4 h-5 w-24 bg-background rounded"></div>
          <div className="text-label">
            {[...Array(4)].map((key) => (
              <div
                className="mt-3 md:mt-4 h-5 w-48 bg-background rounded"
                key={key}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
