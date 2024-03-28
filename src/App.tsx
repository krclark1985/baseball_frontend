import { useState } from 'react'
import './App.css'
import TeamPicker from './screens/TeamPicker'
import { Team } from './types/Team'
import LineupPicker from './screens/LineupPicker'
import StartGameButton from './components/StartGameButton'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  const [awayTeam, setAwayTeam] = useState<Team | null>(null)
  const [homeTeam, setHomeTeam] = useState<Team | null>(null)
  const [awayTeamLineup, setAwayTeamLineup] = useState<any>([])
  const [homeTeamLineup, setHomeTeamLineup] = useState<any>([])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <TeamPicker
                  awayTeam={awayTeam}
                  homeTeam={homeTeam}
                  setHomeTeam={setHomeTeam}
                  setAwayTeam={setAwayTeam}
                />
              }
            />

            <Route
              path="/lineups"
              element={
                <LineupPicker
                  gameId={1} // Change this soon
                  awayTeamId={awayTeam?.id}
                  homeTeamId={homeTeam?.id}
                  setAwayTeamLineup={setAwayTeamLineup}
                  setHomeTeamLineup={setHomeTeamLineup}
                  homeTeamLineup={homeTeamLineup}
                  awayTeamLineup={awayTeamLineup}
                />
              }
            />
          </Routes>
        </Router>
        {/* {areTeamsSelected && (
          <div>
            Away team: {awayTeam.name}
            Home team: {homeTeam.name}
          </div>
        )}

        {areTeamsSelected && (
          <>
            
          </>
        )} */}

        {/* {areTeamsSelected && areLineupsFinished && (
          <StartGameButton />
        )}   */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
