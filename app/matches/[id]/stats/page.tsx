import MatchStatsComp, {
  MatchStatsLoading,
} from "@/app/components/matches/info/match-stats";
import { Suspense } from "react";

export default function MatchStatsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<MatchStatsLoading />}>
      {/* @ts-expect-error Server Component */}
      <MatchStatsComp id={params.id} />
    </Suspense>
  );
}
