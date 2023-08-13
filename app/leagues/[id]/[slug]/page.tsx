import { redirect } from "next/navigation";

export default function LeaguePage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  redirect(`/leagues/${params.id}/${params.slug}/standings`);
}
