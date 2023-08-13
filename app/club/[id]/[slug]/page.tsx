import { redirect } from "next/navigation";

export default function ClubPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  redirect(`/club/${params.id}/${params.slug}/matches`);
}
