import Container from "@/app/components/container/container";
import LeagueInfoContainer from "@/app/components/leagues/container/league-info-container";
import LeagueHeader, {
  LeagueHeaderLoading,
} from "@/app/components/leagues/league-header";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  // fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/leagues/${params.id}/${params.slug}`
  );
  const league = { title: "" };
  if (response.status !== 404) {
    const { data } = await response.json();
    league.title = data.leagueName;
  } else league.title = "الصفحة غير موجودة";

  return {
    title: league.title,
  };
}

export default function LeaguePageLayout({
  params,
  children,
}: {
  params: { id: string; slug: string };
  children: ReactNode;
}) {
  return (
    <Container className="mt-10 md:mt-14 mb-12">
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
