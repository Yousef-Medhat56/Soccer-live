import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ClubHeader({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/club/${id}/${slug}/`
  );
  if (response.status == 404) notFound();
  const { data } = await response.json();
  return (
    <div className="flex items-center text-lg md:text-xl font-bold mt-2 mb-6 md:mb-4 pb-2 border-b-[3px] border-primary w-fit">
      <Image
        src={data.club.img}
        alt={data.club.name}
        width={36}
        height={36}
        className="w-[30px] md:w-[36px] h-[30px] md:h-[36px]"
      />
      <h1 className="pr-2">{data.club.name}</h1>
    </div>
  );
}

export const ClubHeaderLoading = () => {
  return (
    <div className="bg-gray-200 h-7 w-36 mt-2 mb-6 md:mb-4 animate-pulse"></div>
  );
};
