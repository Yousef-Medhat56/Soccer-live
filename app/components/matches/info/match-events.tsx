import { MatchEvent } from "@/types/matches/event";
import Image from "next/image";
import GoalIcon from "@/public/icons/goal.svg";
import YellowCardIcon from "@/public/icons/yellow-card.svg";
import RedCardIcon from "@/public/icons/red-card.svg";
import SecondYellowIcon from "@/public/icons/second-yellow.svg";
import MissedPenIcon from "@/public/icons/missed-penalty.svg";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.css";

export default async function MatchEventsComp({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/events`,
    { next: { revalidate: 60 } }
  );
  const { data: matchEvents }: { data: MatchEvent[] } = await response.json();

  //@ts-ignore
  const noEvents = matchEvents.message ? true : false;

  return (
    <div className="pt-8 md:pt-10 flex flex-col items-center">
      {noEvents ? (
        <h3 className="text-label">أحداث المباراة غير متوفرة</h3>
      ) : (
        <div className={`${styles.timeline}`}>
          <ul className="relative z-10 min-w-full">
            {matchEvents.map((event, index) => {
              return event.isTitle ? (
                <EventTitle eventType={event.eventType} key={index} />
              ) : (
                <>
                  <li
                    key={index}
                    className="font-bold bg-white mx-auto my-14 list-none w-fit px-[10px] py-2 rounded-full text-label border-2 border-stroke"
                  >
                    {"'"}
                    {event.eventTime}
                  </li>
                  <div
                    className={`absolute flex items-center justify-start m-[-100px] mx-0 w-[100px] md:w-[160px] ${
                      event.atHomeTeam
                        ? `${styles.right} flex-row-reverse`
                        : styles.left
                    }`}
                  >
                    {event.eventType == "subst" ? (
                      <SubstEventElm event={event} />
                    ) : (
                      <EventElm event={event} />
                    )}
                  </div>
                </>
              );
            })}
          </ul>
          <div className={`${styles.timelineBar}`}></div>
        </div>
      )}
    </div>
  );
}

const EventTitle = ({ eventType }: { eventType: string }) => {
  return (
    <li className="mx-auto w-fit bg-background text-label font-bold rounded border-stroke border-2 list-none py-2 px-4 ">
      {eventType}
    </li>
  );
};

const EventElm = ({ event }: { event: MatchEvent }) => {
  const returnEventIcon = (eventName: string) => {
    switch (eventName) {
      case "goal":
        return GoalIcon;
      case "yellowcard":
        return YellowCardIcon;
      case "redcard":
        return RedCardIcon;
      case "yellowred":
        return SecondYellowIcon;
      case "pen miss":
        return MissedPenIcon;
      default:
        return SecondYellowIcon;
    }
  };
  return (
    <>
      <Image
        src={returnEventIcon(event.eventType)}
        alt={event.eventType}
        width={45}
        height={45}
        className={`${
          event.atHomeTeam ? "pr-1 md:pr-2" : "pl-1 md:pl-2"
        }w-[35px] md:w-[45px] h-[35px] md:h-[45px]`}
      />
      <span className="text-label text-sm md:text-base">
        {event.playerName}
      </span>
    </>
  );
};

const SubstEventElm = ({ event }: { event: MatchEvent }) => {
  return (
    <div className="mt-[-10px]">
      <div
        className={`flex mt-[6px] ${event.atHomeTeam && "flex-row-reverse"}`}
      >
        {event.atHomeTeam ? (
          <ArrowLeftIcon className="w-7 text-primary pr-2" />
        ) : (
          <ArrowRightIcon className="w-7 text-primary pl-2" />
        )}
        <span className="text-label text-sm md:text-base">
          {event.playerName}
        </span>
      </div>
      <div className={`flex ${event.atHomeTeam && "flex-row-reverse"}`}>
        {event.atHomeTeam ? (
          <ArrowRightIcon className="w-7 text-red-500 pr-2" />
        ) : (
          <ArrowLeftIcon className="w-7 text-red-500 pl-2" />
        )}

        <span className="text-label text-sm md:text-base">
          {event.substituteName}
        </span>
      </div>
    </div>
  );
};

export const MatchEventsLoading = () => {
  return (
    <div className="pt-8 md:pt-10 flex flex-col items-center animate-pulse">
      <div className={`${styles.timeline}`}>
        <ul className="relative z-10 min-w-full">
          <li className="mx-auto w-28 h-10 bg-background  rounded border-stroke border-2 list-none  "></li>
          {[...Array(3)].map((key) => (
            <li
              key={key}
              className=" bg-white w-11 h-11 mx-auto my-14 list-none  rounded-full border-2 border-stroke"
            ></li>
          ))}
          <li className="mx-auto w-28 h-10 bg-background  rounded border-stroke border-2 list-none  "></li>
          {[...Array(3)].map((key) => (
            <li
              key={key}
              className=" bg-white w-11 h-11 mx-auto my-14 list-none  rounded-full border-2 border-stroke"
            ></li>
          ))}
          <li className="mx-auto w-28 h-10 bg-background  rounded border-stroke border-2 list-none  "></li>
        </ul>
        <div className={`${styles.timelineBar}`}></div>
      </div>
    </div>
  );
};
