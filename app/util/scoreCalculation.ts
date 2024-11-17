/* eslint-disable */
/* ts-nocheck */
import { scoring } from "../input-data/data";

export function calculateClubScores(tournaments: any[]) {
  const clubScores = {};

  tournaments.forEach((tournament) => {
    const clubResults = {};

    tournament.results.forEach((result: { position: number; club: string | number; }) => {
      const points = scoring[result.position - 1] || 0;

      // @ts-ignore
      if (!clubResults[result.club]) {
        // @ts-ignore
        clubResults[result.club] = [];
      }
      // @ts-ignore
      clubResults[result.club].push(points);
    });

    Object.keys(clubResults).forEach((club) => {
      // @ts-ignore
      const top3Scores = clubResults[club].sort((a: number, b: number) => b - a).slice(0, 3);
      const totalPoints = top3Scores.reduce((sum: any, score: any) => sum + score, 0);
      // @ts-ignore
      if (!clubScores[club]) {
        // @ts-ignore
        clubScores[club] = 0;
      }
      // @ts-ignore
      clubScores[club] += totalPoints;
    });
  });

  return Object.keys(clubScores).map((club) => ({
    club,
    // @ts-ignore

    points: clubScores[club],
  }));
}