'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Result = {
  category: string
  club: string
  player: string
  position: number
}

type Tournament = {
  id: number
  name: string
  results: Result[]
}

const tournaments: Tournament[] = [
  {
    "id": 1,
    "name": "Desafío Aralar Erronka",
    "results": [
      { category: "MPO", club: "Lekumberri", player: "Rafael Sarriegui Hidalgo", position: 1 },
      { category: "MPO", club: "Lekumberri", player: "Kristopher Vanbogelen", position: 2 },
      { category: "FPO", club: "Lekumberri", player: "Lorea Zulet Ruiz", position: 1 },
      { category: "MP50", club: "Bilbao", player: "David Angulo", position: 1 },
      { category: "MP50", club: "Baxi", player: "Mikel Ibarrola Manterola", position: 2 },
      { category: "MP50", club: "Bilbao", player: "Jose Sampedro Santin", position: 3 },
      { category: "MA3", club: "International", player: "Hugo Rodriguez Fernandez", position: 1 },
      { category: "MA3", club: "Compostela", player: "Pedro Gonzalez Bascoy", position: 2 },
      { category: "MA3", club: "Oviedo", player: "Daniel Díaz Castro", position: 3 },
      { category: "MA3", club: "International", player: "Fraser Ambrose", position: 4 },
      { category: "MA3", club: "International", player: "Armando Del Olmo", position: 5 },
      { category: "MA4", club: "Bilbao", player: "Asier Merino Lekue", position: 1 },
      { category: "MJ18", club: "Bilbao", player: "Beñat Lopez Arribas", position: 1 },
    ]
  },
  {
    "id": 2,
    "name": "Intermad",
    "results": [
      { category: "MPO", club: "Lekumberri", player: "Rafael Sarriegui Hidalgo", position: 4 },
      { category: "MPO", club: "Toros Mijas", player: "Markus Pohjolainen", position: 1 },
      { category: "MPO", club: "Esperit", player: "Marc Lopez Lopez", position: 2 },
      { category: "MPO", club: "Oviedo", player: "Gorka Beltran de Heredia Alvarez", position: 2 },
      { category: "MPO", club: "International", player: "Martin Murray", position: 5 },
      { category: "MPO", club: "Flying", player: "Merlin Sales-Tomas Sales", position: 6 },
      { category: "MPO", club: "International", player: "Jorge BerÁstegui-Sampedro", position: 7 },
      { category: "FPO", club: "Asturias", player: "Ana María Álvarez Menendez", position: 1 },
      { category: "FPO", club: "Osona", player: "Queralt Pinyol", position: 2 },
      { category: "FPO", club: "International", player: "Vanessa Fernandez Fernandez", position: 3 },
      { category: "MP40", club: "International", player: "Robert Abel", position: 1 },
      { category: "MP40", club: "Compostela", player: "Iván Gutiérrez De Terán", position: 2 },
      { category: "MP40", club: "Compostela", player: "Manuel Angel Almeida Posada", position: 2 },
      { category: "MP40", club: "Esperit", player: "David Wilde", position: 4 },
      { category: "MP40", club: "Osona", player: "Marc Font Font", position: 5 },
      { category: "MP40", club: "Compostela", player: "Alejandro Liz Graña", position: 6 },
      { category: "MP50", club: "Bilbao", player: "David Angulo", position: 2 },
      { category: "MP50", club: "Baxi", player: "Iñaki González Olaizola", position: 1 },
      { category: "MP50", club: "Oviedo", player: "Javier Del Riego", position: 3 },
      { category: "MP50", club: "International", player: "Toni Barrientos", position: 4 },
      { category: "MP50", club: "Baxi", player: "Antonio Negrete Gutiérrez", position: 5 },
      { category: "MP50", club: "Esperit", player: "Eloy Gomez Ingelmo", position: 6 },
      { category: "MP50", club: "International", player: "Ismael Rodriguez", position: 7 },
      { category: "MA3", club: "International", player: "Hugo Rodriguez Fernandez", position: 2 },
      { category: "MA3", club: "Oviedo", player: "Daniel Díaz Castro", position: 1 },
      { category: "MA3", club: "International", player: "Fraser Ambrose", position: 7 },
      { category: "MA3", club: "International", player: "Armando Del Olmo", position: 6 },
      { category: "MA3", club: "International", player: "Juan Aramburu", position: 3 },
      { category: "MA3", club: "International", player: "Nelson Zurdo", position: 4 },
      { category: "MA3", club: "International", player: "Stefan Nestelberger", position: 5 },
      { category: "MA3", club: "International", player: "Pepe García", position: 8 },
      { category: "MA3", club: "International", player: "Lucas Rey Braga", position: 9 },
      { category: "MA3", club: "International", player: "Héctor Triano Alcántara", position: 10 },
      { category: "MA3", club: "International", player: "Nacho Ocho", position: 11 },
      { category: "MA3", club: "Asturias", player: "Jorge Almeida", position: 11 },
      { category: "MA4", club: "International", player: "Arturo García Rodrigo", position: 1 },
      { category: "MA4", club: "International", player: "Rubén Hoya", position: 2 },
      { category: "MA4", club: "Oviedo", player: "José Francisco Hernández López", position: 3 },
      { category: "MA4", club: "Osona", player: "Ferran Boix Piella", position: 4 },
      { category: "MA4", club: "Oviedo", player: "Javier Lorences Fernandez", position: 5 },
      { category: "MA4", club: "Oviedo", player: "Hernán Fernández Joglar", position: 6 },
      { category: "MA4", club: "Oviedo", player: "Marcos Garcia Almeida", position: 7 },
      { category: "MA4", club: "International", player: "Dennis Neiman", position: 8 },
      { category: "MA4", club: "International", player: "John Turcany", position: 9 },
      { category: "MA4", club: "International", player: "Francisco Panero", position: 10 },
      { category: "MA4", club: "International", player: "Miguel Angel Moral", position: 10 },
      { category: "MA4", club: "International", player: "Eduardo Martín Manzanera", position: 12 },
      { category: "MJ18", club: "Esperit", player: "Lucas Gómez Feijoo", position: 1 }
    ]
  }
]

export default function TournamentResults() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  const calculatePoints = (position: number) => {
    if (position === 1) return 25
    if (position === 2) return 20
    if (position === 3) return 16
    if (position === 4) return 13
    if (position === 5) return 11
    if (position >= 6 && position <= 14) return 15 - position
    return 1
  }

  const calculateClubPoints = (results: Result[]) => {
    const clubPoints: { [key: string]: number[] } = {}
    results.forEach(result => {
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
        points: points.sort((a, b) => b - a).slice(0, 3).reduce((sum, p) => sum + p, 0)
      }))
      .sort((a, b) => b.points - a.points)
  }

  const calculateOverallPlayerResults = () => {
    const playerResults: { [key: string]: { player: string, category: string, club: string, totalPoints: number } } = {}
    tournaments.forEach(tournament => {
      tournament.results.forEach(result => {
        const points = calculatePoints(result.position)
        const key = `${result.player}-${result.category}`
        if (!playerResults[key]) {
          playerResults[key] = { player: result.player, category: result.category, club: result.club, totalPoints: points }
        } else {
          playerResults[key].totalPoints += points
        }
      })
    })
    return Object.values(playerResults).sort((a, b) => b.totalPoints - a.totalPoints)
  }

  const calculateOverallClubResults = () => {
    const clubResults: { [key: string]: number } = {}
    tournaments.forEach(tournament => {
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

  const categories = selectedTournament
    ? Array.from(new Set(selectedTournament.results.map(r => r.category)))
    : []

  const overallPlayerResults = calculateOverallPlayerResults()
  const overallClubResults = calculateOverallClubResults()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resultados de la copa 24-25</h1>
      <Tabs defaultValue={selectedTournament ? selectedTournament.id.toString() : 'overall'} className="mb-6">
        <TabsList>
          <TabsTrigger value="overall" onClick={() => setSelectedTournament(null)}>
            Resultados globales
          </TabsTrigger>
          {tournaments.map(tournament => (
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
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categories.map(category => (
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
                          .filter(result => result.category === category)
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
              <CardTitle>Resultado global de jugadores</CardTitle>
            </CardHeader>
            <CardContent>
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
    </div>
  )
}