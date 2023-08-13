"use client";
import { TeamLineup } from "@/types/matches/lineup";
import SoccerLineUp from "react-soccer-lineup";

export default function Pitch({
  home,
  away,
}: {
  home: TeamLineup;
  away: TeamLineup;
}) {
  return (
    <div dir="ltr" className="rotation-wrapper-outer">
      <div className="rotation-wrapper-inner">
        <SoccerLineUp
          size={"small"}
          color={"#7ABF74"}
          pattern={"lines"}
          homeTeam={{
            squad: home.mainPlayers,
          }}
          awayTeam={{ squad: away.mainPlayers }}
        />
      </div>
    </div>
  );
}
