import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MatchesDayPicker({
  date,
  selectedDay,
  setSelectedDay,
}: {
  date: string | null;
  selectedDay: Date;
  setSelectedDay: Dispatch<SetStateAction<Date>>;
}) {
  const router = useRouter();
  const [showDayPicker, setShowDayPicker] = useState(false);

  const toggleShowDayPicker = () => setShowDayPicker(!showDayPicker);
  
  const handleSelectDay = (selectedDate: Date) => {
    router.push(`/matches?date=${format(selectedDate, "y-MM-dd")}`);
    setSelectedDay(selectedDate);
  };

  return (
    <>
      <button
        className="mr-2 md:mr-3 p-2 rounded-full hover:bg-gray-100 duration-300"
        onClick={toggleShowDayPicker}
      >
        {showDayPicker ? (
          <XMarkIcon className="text-primary w-7 md:w-8" />
        ) : (
          <CalendarDaysIcon className="text-primary w-7 md:w-8" />
        )}
      </button>
      {showDayPicker && (
        <div className="z-[100] absolute top-[60px] md:top-[72px] left-[16px] md:left-[36px] shadow-xl rounded-lg bg-[#fdfdfd]">
          <DayPicker
            mode="single"
            selected={selectedDay}
            //@ts-ignore
            onSelect={handleSelectDay}
            locale={ar}
            defaultMonth={selectedDay}
          />
        </div>
      )}
    </>
  );
}
