import ClubHeader, { ClubHeaderLoading } from "@/app/components/club/club-header";
import ClubInfoContainer from "@/app/components/club/container/club-info-container";
import Container from "@/app/components/container/container";

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
        <Suspense fallback={<ClubHeaderLoading />}>
          {/* @ts-expect-error Server Component */}
          <ClubHeader id={params.id} slug={params.slug} />
        </Suspense>
        <ClubInfoContainer id={params.id} slug={params.slug}>
          {children}
        </ClubInfoContainer>
      </main>
    </Container>
  );
}
