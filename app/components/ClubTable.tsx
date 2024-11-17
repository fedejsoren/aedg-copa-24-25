interface ClubResult {
  club: string;
  points: number;
}

interface ClubTableProps {
  results: ClubResult[];
}

const ClubTable: React.FC<ClubTableProps> = ({ results }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">Club Results</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Club</th>
            <th className="border px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((club, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{club.club}</td>
              <td className="border px-4 py-2">{club.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;