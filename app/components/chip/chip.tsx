export default function Chip({
  text,
  filled = false,
  className,
}: {
  text: string;
  filled?: boolean;
  className?: string;
}) {
  return (
    <>
      {filled ? (
        <FilledChip text={text} className={className} />
      ) : (
        <OutlinedChip text={text} className={className} />
      )}
    </>
  );
}

export const OutlinedChip = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-[1px] border-stroke inline-block px-3 py-[2px] rounded-lg text-label ${className}`}
    >
      {text}
    </div>
  );
};

export const FilledChip = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-[1px] border-primary inline-block px-3 py-[2px] rounded-lg text-white bg-primary ${className}`}
    >
      {text}
    </div>
  );
};

export const ChipLoading = () => {
  return (
    <div className="animate-pulse inline-block w-20 h-6 rounded-lg bg-gray-200 ml-2"></div>
  );
};
