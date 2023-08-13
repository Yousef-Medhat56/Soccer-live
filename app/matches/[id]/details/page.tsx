import MatchDetailsContainer, {
  MatchDetailsContainerLoading,
} from "@/app/components/matches/container/match-details";
import { Suspense } from "react";

export default function MatchDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<MatchDetailsContainerLoading />}>
      {/* @ts-expect-error Server Component */}
      <MatchDetailsContainer id={params.id} />
    </Suspense>
  );
}
