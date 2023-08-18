import Container from "@/app/components/container/container";
import MatchInfoConatiner from "@/app/components/matches/container/match-info-container";
import MatchResultCard, {
  MatchResultCardLoading,
} from "@/app/components/matches/match-result";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/matches/${id}/results`
  );
  const match = { title: "" };
  if (response.status !== 404) {
    const { data } = await response.json();
    match.title = `مباراة ${data.home.name} و${data.away.name}`;
  } else match.title = "الصفحة غير موجودة";

  return {
    title: match.title,
  };
}

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

      <Container className="mb-12">
        <main>
          <MatchInfoConatiner id={params.id}>{children}</MatchInfoConatiner>
        </main>
      </Container>
    </>
  );
}
