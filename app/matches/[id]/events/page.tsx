import MatchEventsComp, {
  MatchEventsLoading,
} from "@/app/components/matches/info/match-events";
import { Suspense } from "react";

export default function MatchEventsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<MatchEventsLoading />}>
      {/* @ts-expect-error Server Component */}
      <MatchEventsComp id={params.id} />
    </Suspense>
  );
}
