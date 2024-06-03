import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ConfettiExplosion from 'react-confetti-explosion'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from 'src/components/LoadingScreen'
import MainButton from 'src/components/MainButton'
import { ServerAddress } from 'src/constants/ServerAddress'
import { Game } from 'src/models/Game'
import { TeamColors } from 'src/team/TeamColors'

export default function FinalScorePage() {
  const { gameId } = useParams()
  const navigate = useNavigate()

  const getGameOutcome = async () => {
    const url = `${ServerAddress}/game/${gameId}/game_outcome`

    const response = await axios.get(url)

    return response.data
  }

  const gameInfoQuery = useQuery({
    queryKey: ['game'],
    queryFn: getGameOutcome,
    refetchOnMount: true,
  })

  if (!gameInfoQuery.data) {
    return <LoadingScreen />
  }

  const {
    team1_name: awayName,
    team2_name: homeName,
    winner,
    team1_runs: aRuns,
    team2_runs: hRuns,
  } = gameInfoQuery.data as Game.Winner

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-around">
        <ConfettiExplosion zIndex={999999999} />
        <ConfettiExplosion zIndex={999999999} />
      </Box>

      <Typography textAlign="center" variant="h2">
        {winner} WON!
      </Typography>

      <Typography textAlign="center" variant="h2" mb={4}>
        {aRuns} - {hRuns}
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <Box minWidth={200} maxWidth={300}>
          <img
            style={{ maxWidth: 200 }}
            src={`${TeamColors[awayName as string].png}`}
          />
        </Box>
        <Typography variant="h3">VS</Typography>
        <Box>
          <img
            style={{ maxWidth: 200 }}
            src={`${TeamColors[homeName as string].png}`}
          />
        </Box>
      </Box>

      <MainButton
        boxProps={{ mt: 2 }}
        onClick={() => {
          navigate(`/`)
        }}
      >
        <span>Return Home</span>
      </MainButton>
    </Box>
  )
}
