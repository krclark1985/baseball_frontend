import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingScreen from '../components/LoadingScreen'
import { TeamColors } from '../team/TeamColors'
import { useNavigate } from 'react-router-dom'
import { Game } from '../models/Game'



export default function GamePicker() {
  const navigate = useNavigate()

  const getGames = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game`
    )

    return response.data
  }

  const existingGamesQuery = useQuery({
    queryKey: ['existing-games'],
    queryFn: getGames,
  })

  if (existingGamesQuery.isLoading || !existingGamesQuery.data) {
    return <LoadingScreen />
  }

  const activeGames: Game.IndexRecord[] = []
  const inactiveGames: Game.IndexRecord[] = []

  existingGamesQuery.data.forEach((game: Game.IndexRecord) => {
    if (game.active) {
      activeGames.push(game)
    } else {
      inactiveGames.push(game)
    }
  })


  if (existingGamesQuery.error || !existingGamesQuery.data.length) {
    return (
      <Box p={3}>
        <Typography> There are no games started yet! </Typography>
        <Box
          maxWidth={200}
          p={2}
          borderRadius={2}
          border="1px solid rgba(0, 0, 0, 0.25)"
          textAlign="center"
          style={{ cursor: 'pointer', marginTop: 16 }}
          sx={{
            transition: 'all 0.25s ease',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white',
              boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
            },
          }}
          onClick={() => navigate(`/`)}
        >
          Back to Home
        </Box>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h2" fontWeight={500} mb={4}>
        {' '}
        Find an Active Game{' '}
      </Typography>

      {activeGames.map(
        (game) => {
          return (
            <Box key={game.id}>
              Game ID: {game.id}
              <Box
                display="flex"
                justifyContent="center"
                mb={4}
                maxWidth={300}
                alignItems="center"
                style={{ cursor: 'pointer' }}
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.20)',
                  },
                }}
                borderRadius={2}
                onClick={() => {
                  if (!game.team1_name || !game.team2_name) {
                    navigate(`/game/${game.id}/team-pick`)

                    return
                  }

                  navigate(`/game/${game.id}`)
                }}
                p={1}
                border={'1px solid rgba(0, 0, 0, 0.2)'}
              >
                {game.team1_name && game.team2_name ? (
                  <>
                    <Box>
                      <img
                        style={{ maxWidth: 100 }}
                        src={TeamColors[game.team1_name as any].png}
                      />
                    </Box>
                    <Typography mx={2}>VS</Typography>
                    <Box>
                      <img
                        style={{ maxWidth: 100 }}
                        src={TeamColors[game.team2_name as any].png}
                      />
                    </Box>
                  </>
                ) : (
                  <Typography>Choose Teams</Typography>
                )}
              </Box>
            </Box>
          )
        }
      )}

      {inactiveGames.length && (
        <Box mt={3}>
          <Typography variant="h2" fontWeight={500} mb={4}>
            Finished Games
          </Typography>

          {inactiveGames.map((game) => {
            return (
              <Box key={game.id}>
              Game ID: {game.id}
              <Box
                display="flex"
                justifyContent="center"
                mb={4}
                maxWidth={300}
                alignItems="center"
                style={{ cursor: 'pointer' }}
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.20)',
                  },
                }}
                borderRadius={2}
                p={1}
                border={'1px solid rgba(0, 0, 0, 0.2)'}
              >
                <Box>
                  <img
                    style={{ maxWidth: 100 }}
                    src={TeamColors[game.team1_name as any].png}
                  />
                </Box>
                <Typography mx={2}>VS</Typography>
                <Box>
                  <img
                    style={{ maxWidth: 100 }}
                    src={TeamColors[game.team2_name as any].png}
                  />
                </Box>
              </Box>
            </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
