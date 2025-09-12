export type Result = {
  category: string
  club: string
  player: string
  position: number
}

export type Tournament = {
  id: number
  name: string
  results: Result[]
}

export type Season = {
  id: string
  name: string
  tournaments: Tournament[]
}
