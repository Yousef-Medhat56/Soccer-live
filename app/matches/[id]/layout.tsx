import Container from "@/app/components/container/container";
import MatchInfoConatiner from "@/app/components/matches/container/match-info-container";
import MatchResultCard, {
  MatchResultCardLoading,
} from "@/app/components/matches/match-result";
import { ReactNode, Suspense } from "react";

export default function MatchPageLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  return (
    <>
      <Container className="my-10 md:mt-14 md:mb-10">
        <main>
          <Suspense fallback={<MatchResultCardLoading />}>
            {/* @ts-expect-error Server Component */}
            <MatchResultCard id={params.id} />
          </Suspense>
        </main>
      </Container>

      <Container className="mb-24">
        <main>
          <MatchInfoConatiner id={params.id}>{children}</MatchInfoConatiner>
        </main>
      </Container>
    </>
  );
}
