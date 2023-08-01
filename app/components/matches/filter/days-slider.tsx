import { eachDayOfInterval, format } from "date-fns";
import { ar } from "date-fns/locale";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function DaysSlider({
  date,
  setSelectedDay,
}: {
  date: string | null;
  setSelectedDay: Dispatch<SetStateAction<Date>>;
}) {
  const numberOfDaysDisplayed = 6;
  const selectedDayTime = date ? new Date(date).getTime() : Date.now();
  const startDate =
    selectedDayTime - (1000 * 60 * 60 * 24 * numberOfDaysDisplayed) / 2;
  const endDate =
    selectedDayTime + (1000 * 60 * 60 * 24 * numberOfDaysDisplayed) / 2;
  const buildDatesArr = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const handleClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex items-center justify-between lg:justify-center mt-4 max-w-full  overflow-x-scroll lg:overflow-x-auto">
      <div className="flex items-center justify-between xl:justify-center border-b-2 border-stroke">
        {buildDatesArr.map((day, index) => {
          const isTodayDate =
            format(day, "y-MM-dd") == format(new Date(), "y-MM-dd");
          const isSelectedDay = date
            ? day.getDate() == new Date(date).getDate()
            : false;
          
          return (
            <Link href={`/matches?date=${format(day, "y-MM-dd")}`} key={index}>
              <span
                className={`block text-sm lg:text-base px-3 py-3 w-max text-ignored hover:bg-gray-100 duration-300 rounded-t rounded-tl ${
                  ((isTodayDate && !date) || isSelectedDay) &&
                  "text-primary border-b-2 mb-[-2px] border-primary"
                }`}
                onClick={() => handleClickDay(day)}
              >
                {isTodayDate
                  ? "اليوم"
                  : format(day, "EEEE d MMMM", { locale: ar })}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
