import { createTeamFormation, getSubsitutes } from "./utils";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const url = `https://www.btolat.com/matches/LinupGet/${id}`;
  //fetch data
  const response = await fetch(url, { next: { revalidate: 60 } });
  const data = await response.json();

  //check if the response is successful
  if (response.status == 200 && data.localteam.lstlinup.length > 0) {
    //home team formation
    const homeTeam = createTeamFormation(
      data.localteam.formation,
      data.localteam.lstlinup
    );

    //add subsitute players
    const homeSubstitutes = await getSubsitutes(id, true);
    homeTeam.substitutes = homeSubstitutes;

    //away team formation
    const awayTeam = createTeamFormation(
      data.vistorteam.formation,
      data.vistorteam.lstlinup
    );
    //add subsitute players
    const awaySubstitutes = await getSubsitutes(id, false);
    awayTeam.substitutes = awaySubstitutes;

    return new Response(JSON.stringify({ home: homeTeam, away: awayTeam }));
  } else {
    return new Response(
      JSON.stringify({
        data: {
          matchId: id,
          message: `Match lineups are not available.`,
        },
      }),
      { status: 404 }
    );
  }
}
