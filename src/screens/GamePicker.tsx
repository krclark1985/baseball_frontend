import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingScreen from '../components/LoadingScreen'
import { TeamColors } from '../team/TeamColors'
import { useNavigate } from 'react-router-dom'

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

  if (existingGamesQuery.isLoading) {
    return <LoadingScreen />
  }

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
      <Typography variant="h2" fontWeight={500}>
        {' '}
        Find an Existing Game{' '}
      </Typography>

      {existingGamesQuery.data.forEach(
        (game: {
          id: number
          team1_name: string | null
          team2_name: string | null
        }) => {
          return (
            <Box key={game.id} display="flex">
              <Box>
                <img src={TeamColors[game.team1_name as any]} />
              </Box>
              <Typography>VS</Typography>
              <Box>
                <img src={TeamColors[game.team2_name as any]} />
              </Box>
            </Box>
          )
        }
      )}
    </Box>
  )
}
