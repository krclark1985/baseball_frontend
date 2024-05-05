import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GamePage from './screens/GamePage'
import GameCreator from './screens/GameCreator'
import TeamPicker from './screens/TeamPicker'
import LineupGenerator from './screens/LineupGenerator'
import HomePage from './screens/HomePage'
import { ThemeProvider } from '@mui/material/styles'
import createTheme from '@mui/material/styles/createTheme'

const queryClient = new QueryClient()

// https://mui.com/material-ui/customization/typography/
const theme = createTheme({
  typography: {
    fontFamily: [
      'montserrat',
      'roboto',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/game-create" element={<GameCreator />} />

              <Route path="/game/:gameId/team-pick" element={<TeamPicker />} />

              <Route
                path="/game/:gameId/lineups/randomzie"
                element={<LineupGenerator />}
              />

              <Route path="/game/:gameId" element={<GamePage />} />
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
