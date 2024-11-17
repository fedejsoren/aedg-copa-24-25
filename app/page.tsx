import { tournaments } from "./input-data/data";
import CategoryTable from "./components/CategoryTable";
import ClubTable from "./components/ClubTable";
import { calculateClubScores } from "./util/scoreCalculation";

export default function Home() {
  const categories = ["MPO", "FPO", "MP40", "MJ18", "MP50", "MA3", "MA4", "FA4"];
  const clubScores = calculateClubScores(tournaments);

  return (
    <div className="container mx-auto p-4">
      {categories.map((category) => {
        const results = tournaments
          .flatMap((t) => t.results)
          .filter((r) => r.category === category);

        return <CategoryTable key={category} category={category} results={results} />;
      })}

      <ClubTable results={clubScores} />
    </div>
  );
}