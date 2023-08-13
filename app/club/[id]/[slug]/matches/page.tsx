import ClubMatchesContainer, {
  ClubMatchesContainerLoading,
} from "@/app/components/club/container/club-matches-container";
import { Suspense } from "react";

export default function ClubMatchesPage({
  params,
  searchParams,
}: {
  params: { id: string; slug: string };
  searchParams: { previous: string; league: string };
}) {
  return (
    <div className="mt-6">
      <Suspense fallback={<ClubMatchesContainerLoading />}>
        {/* @ts-expect-error Server Component */}
        <ClubMatchesContainer
          id={params.id}
          slug={params.slug}
          previous={searchParams.previous}
          league={searchParams.league}
        />
      </Suspense>
    </div>
  );
}
