import Container from "@/app/components/container/container";
import LeagueInfoContainer from "@/app/components/leagues/container/league-info-container";
import LeagueHeader, {
  LeagueHeaderLoading,
} from "@/app/components/leagues/league-header";
import { ReactNode, Suspense } from "react";

export default function LeaguePageLayout({
  params,
  children,
}: {
  params: { id: string; slug: string };
  children: ReactNode;
}) {
  return (
    <Container className="my-10 md:mt-14 md:mb-10">
      <main>
        <Suspense fallback={<LeagueHeaderLoading />}>
          {/* @ts-expect-error Server Component */}
          <LeagueHeader id={params.id} slug={params.slug} />
        </Suspense>
        <LeagueInfoContainer id={params.id} slug={params.slug}>
          {children}
        </LeagueInfoContainer>
      </main>
    </Container>
  );
}
