import React from "react";

interface Result {
  player: string;
  club: string;
  position: number;
}

interface CategoryTableProps {
  category: string;
  results: Result[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category, results }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">{category} Results</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Player</th>
            <th className="border px-4 py-2">Club</th>
            <th className="border px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{result.position}</td>
              <td className="border px-4 py-2">{result.player}</td>
              <td className="border px-4 py-2">{result.club}</td>
              <td className="border px-4 py-2">{25 - (result.position - 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;