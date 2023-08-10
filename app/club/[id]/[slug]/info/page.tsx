import ClubInfoComp, { ClubInfoCompLoading } from "@/app/components/club/container/club-info-comp";
import TableLoading from "@/app/components/tables/table-loading";
import { Suspense } from "react";

export default function ClubInfoPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<ClubInfoCompLoading/>}>
        {/* @ts-expect-error Server Component */}
        <ClubInfoComp id={params.id} slug={params.slug} />
      </Suspense>
    </div>
  );
}
