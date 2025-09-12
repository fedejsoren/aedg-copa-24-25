"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasons } from "./seasons-data"
import type { Result, Tournament, Season } from "./types"

export default function TournamentResults() {
  const [selectedSeason, setSelectedSeason] = useState<Season>(seasons[1]) // Default to current season 2025-2026
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [selectedOverallCategory, setSelectedOverallCategory] = useState<string | null>(null)

  const calculatePoints = (position: number) => {
    if (position === 1) return 25
    if (position === 2) return 20
    if (position === 3) return 15
    if (position === 4) return 12
    if (position === 5) return 10
    if (position >= 6 && position <= 13) return 15 - position
    return 1
  }

  const calculateClubPoints = (results: Result[]) => {
    const clubPoints: { [key: string]: number[] } = {}
    results.forEach((result) => {
      const points = calculatePoints(result.position)
      if (!clubPoints[result.club]) {
        clubPoints[result.club] = [points]
      } else {
        clubPoints[result.club].push(points)
      }
    })
    return Object.entries(clubPoints)
      .map(([club, points]) => ({
        club,
        points: points
          .sort((a, b) => b - a)
          .slice(0, 5)
          .reduce((sum, p) => sum + p, 0),
      }))
      .sort((a, b) => b.points - a.points)
  }

  const calculateOverallPlayerResults = () => {
    const playerResults: { [key: string]: { player: string; category: string; club: string; totalPoints: number } } = {}
    selectedSeason.tournaments.forEach((tournament) => {
      tournament.results.forEach((result) => {
        const points = calculatePoints(result.position)
        const key = `${result.player}-${result.category}`
        if (!playerResults[key]) {
          playerResults[key] = {
            player: result.player,
            category: result.category,
            club: result.club,
            totalPoints: points,
          }
        } else {
          playerResults[key].totalPoints += points
        }
      })
    })
    return Object.values(playerResults).sort((a, b) => b.totalPoints - a.totalPoints)
  }

  const calculateOverallClubResults = () => {
    const clubResults: { [key: string]: number } = {}
    selectedSeason.tournaments.forEach((tournament) => {
      const tournamentClubPoints = calculateClubPoints(tournament.results)
      tournamentClubPoints.forEach(({ club, points }) => {
        if (!clubResults[club]) {
          clubResults[club] = points
        } else {
          clubResults[club] += points
        }
      })
    })
    return Object.entries(clubResults)
      .map(([club, points]) => ({ club, points }))
      .sort((a, b) => b.points - a.points)
  }

  const categories = Array.from(new Set(selectedSeason.tournaments.flatMap((t) => t.results.map((r) => r.category))))
  const overallPlayerResults = calculateOverallPlayerResults()
  const overallClubResults = calculateOverallClubResults()

  const handleSeasonChange = (seasonId: string) => {
    const season = seasons.find((s) => s.id === seasonId)
    if (season) {
      setSelectedSeason(season)
      setSelectedTournament(null) // Reset tournament selection when changing season
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Resultados Copa de España</h1>
        <div className="w-full sm:w-64">
          <Select value={selectedSeason.id} onValueChange={handleSeasonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar temporada" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedSeason.tournaments.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              No hay torneos disponibles para la temporada {selectedSeason.name}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue={selectedTournament ? selectedTournament.id.toString() : "overall"} className="mb-6">
            <TabsList>
              <TabsTrigger value="overall" onClick={() => setSelectedTournament(null)}>
                Resultados globales
              </TabsTrigger>
              {selectedSeason.tournaments.map((tournament) => (
                <TabsTrigger
                  key={tournament.id}
                  value={tournament.id.toString()}
                  onClick={() => setSelectedTournament(tournament)}
                >
                  {tournament.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {selectedTournament ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resultados por categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={categories[0]} className="w-full">
                    <TabsList className="mb-4">
                      {categories.map((category) => (
                        <TabsTrigger key={category} value={category}>
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {categories.map((category) => (
                      <TabsContent key={category} value={category}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Posición</TableHead>
                              <TableHead>Jugador</TableHead>
                              <TableHead>Club</TableHead>
                              <TableHead>Puntos</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedTournament.results
                              .filter((result) => result.category === category)
                              .sort((a, b) => a.position - b.position)
                              .map((result, index) => (
                                <TableRow key={index}>
                                  <TableCell>{result.position}</TableCell>
                                  <TableCell>{result.player}</TableCell>
                                  <TableCell>{result.club}</TableCell>
                                  <TableCell>{calculatePoints(result.position)}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultado de los clubes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Club</TableHead>
                        <TableHead>Puntos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculateClubPoints(selectedTournament.results).map((clubResult, index) => (
                        <TableRow key={index}>
                          <TableCell>{clubResult.club}</TableCell>
                          <TableCell>{clubResult.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Líderes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all" onClick={() => setSelectedOverallCategory(null)}>
                        Todas las categorías
                      </TabsTrigger>
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          onClick={() => setSelectedOverallCategory(category)}
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <TabsContent value="all">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Jugador</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Club</TableHead>
                            <TableHead>Puntos totales</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {overallPlayerResults.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell>{result.player}</TableCell>
                              <TableCell>{result.category}</TableCell>
                              <TableCell>{result.club}</TableCell>
                              <TableCell>{result.totalPoints}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    {categories.map((category) => (
                      <TabsContent key={category} value={category}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Jugador</TableHead>
                              <TableHead>Club</TableHead>
                              <TableHead>Puntos totales</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {overallPlayerResults
                              .filter((result) => result.category === category)
                              .map((result, index) => (
                                <TableRow key={index}>
                                  <TableCell>{result.player}</TableCell>
                                  <TableCell>{result.club}</TableCell>
                                  <TableCell>{result.totalPoints}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultados generales de clubes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Club</TableHead>
                        <TableHead>Puntos totales</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overallClubResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.club}</TableCell>
                          <TableCell>{result.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  )
}
