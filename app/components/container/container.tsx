export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`relative bg-white shadow-md rounded-lg px-4 md:px-9 py-5 mx-4 md:mx-20 lg:mx-32 3xl:max-w-[1400px] 3xl:m-auto ${className}`}
    >
      {children}
    </div>
  );
}
