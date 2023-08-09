import LeagueMatchesComp from "@/app/components/leagues/container/league-matches";
import SelectRoundWrapper, {
  SelectRoundLoading,
} from "@/app/components/leagues/filter/select-round-wrapper";
import { Suspense } from "react";

export default function LeagueMatchesPage({
  params,
  searchParams,
}: {
  params: { id: string; slug: string };
  searchParams: { round?: string };
}) {
  return (
    <div>
      <Suspense fallback={<SelectRoundLoading />}>
        {/* @ts-expect-error Server Component */}
        <SelectRoundWrapper id={params.id} slug={params.slug} />
      </Suspense>

      <LeagueMatchesComp
        id={params.id}
        slug={params.slug}
        roundId={searchParams.round}
      />
    </div>
  );
}
