import ClubHeader, {
  ClubHeaderLoading,
} from "@/app/components/club/club-header";
import ClubInfoContainer from "@/app/components/club/container/club-info-container";
import Container from "@/app/components/container/container";
import { Metadata } from "next";

import { ReactNode, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  // fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/club/${params.id}/${params.slug}`
  );
  const club = { title: "" };
  if (response.status !== 404) {
    const { data } = await response.json();
    club.title = data.club.name;
  } else club.title = "الصفحة غير موجودة";

  return {
    title: club.title,
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
