export default function TableLoading({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  return (
    <div className="md:flex justify-center overflow-x-scroll md:overflow-x-auto mt-6 md:mt-8 animate-pulse">
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            {[...Array(columns)].map((key) => (
              <th key={key} className="h-2 w-10 animate-pulse">
                <div className="px-8 py-2 bg-gray-200 border-x-4 border-white"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((key) => (
            <tr key={key} className="h-6">
              <td className="min-w-[120px] lg:min-w-[150px] border-y-8 border-white bg-gray-200 animate-pulse"></td>
              {[...Array(columns)].map((key) => (
                <td key={key}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
