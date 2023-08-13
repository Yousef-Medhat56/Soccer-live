import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "المباراة",
};

export default function MatchPage({ params }: { params: { id: string } }) {
  redirect(`/matches/${params.id}/stats`);
}
