import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GameListPage from './screens/GameListPage'
import GamePage from './screens/GamePage'
import GameCreator from './screens/GameCreator'
import TeamPicker from './screens/TeamPicker'
import LineupGenerator from './screens/LineupGenerator'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/" // TODO: Show screen that decides if a player wants to start a new game.
              element={<>weeeee</>}
            />

            <Route path="/game-create" element={<GameCreator />} />

            <Route path="/game/:gameId/team-pick" element={<TeamPicker />} />

            <Route
              path="/game/:gameId/lineups/randomzie"
              element={<LineupGenerator />}
            />

            <Route path="/games" element={<GameListPage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
