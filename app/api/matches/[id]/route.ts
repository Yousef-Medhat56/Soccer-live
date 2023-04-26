import { redirect } from "next/navigation";

export function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  redirect(`/api/matches/${params.id}/stats`);
}
