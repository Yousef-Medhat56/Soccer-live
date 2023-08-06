import { Suspense } from 'react';
import MatchLineupComp, { MatchLineupLoading } from '@/app/components/matches/info/match-lineups';
  
  export default function MatchEventsPage({
    params,
  }: {
    params: { id: string };
  }) {
    return (
        <Suspense fallback={<MatchLineupLoading />}>
      {/* @ts-expect-error Server Component */}
      <MatchLineupComp id={params.id} />
    </Suspense>
    );
  }
  