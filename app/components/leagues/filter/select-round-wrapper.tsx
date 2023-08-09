import { OptionTag } from "@/types/league/matches";
import React from "react";
import SelectRound from "./select-round";

export default async function SelectRoundWrapper({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/leagues/${id}/${slug}/rounds`
  );

  const {
    data: { rounds, selectedRound },
  }: {
    data: {
      rounds: OptionTag[];
      selectedRound: { roundQueryStr: string };
    };
  } = await response.json();
  return (
    <div className="pt-6 flex justify-end">
      {rounds && (
        <SelectRound roundsArr={rounds} selectedRound={selectedRound} />
      )}
    </div>
  );
}

export const SelectRoundLoading = () => {
  return (
    <div className="pt-6 flex justify-end animate-pulse">
      <div className="w-28 h-8 bg-gray-200 rounded"></div>
    </div>
  );
};
