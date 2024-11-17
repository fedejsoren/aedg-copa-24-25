import { scoring } from "../input-data/data";

export function calculateClubScores(tournaments) {
  const clubScores = {};

  tournaments.forEach((tournament) => {
    const clubResults = {};

    tournament.results.forEach((result) => {
      const points = scoring[result.position - 1] || 0;

      if (!clubResults[result.club]) {
        clubResults[result.club] = [];
      }
      clubResults[result.club].push(points);
    });

    Object.keys(clubResults).forEach((club) => {
      const top3Scores = clubResults[club].sort((a, b) => b - a).slice(0, 3);
      const totalPoints = top3Scores.reduce((sum, score) => sum + score, 0);

      if (!clubScores[club]) {
        clubScores[club] = 0;
      }
      clubScores[club] += totalPoints;
    });
  });

  return Object.keys(clubScores).map((club) => ({
    club,
    points: clubScores[club],
  }));
}