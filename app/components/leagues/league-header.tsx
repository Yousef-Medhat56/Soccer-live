export default async function LeagueHeader({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/leagues/${id}/${slug}/`
  );

  const { data } = await response.json();
  return (
    <h1 className="text-lg md:text-xl font-bold mt-2 mb-6 md:mb-4 pb-2 border-b-[3px] border-primary w-fit">
      {data.leagueName}
    </h1>
  );
}

export const LeagueHeaderLoading = () => {
  return (
    <div className="bg-gray-200 h-7 w-36 mt-2 mb-6 md:mb-4 animate-pulse"></div>
  );
};
