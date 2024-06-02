import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ServerAddress } from 'src/constants/ServerAddress'

export default function FinalScoreScreen() {
  const { gameId } = useParams()
  const navigate = useNavigate()

  const getGameOutcome = async () => {
    const url = `${ServerAddress}/game/${gameId}/game_outcome`

    console.log(url)

    const response = await axios.get(url)

    return response.data
  }

  const gameInfoQuery = useQuery({
    queryKey: ['game'],
    queryFn: getGameOutcome,
    refetchOnWindowFocus: false,
  })

  console.log('gameInfoQuery: ', gameInfoQuery.data)

  return (
    <Box p={3}>
      <Box
        style={{ cursor: 'pointer' }}
        maxWidth={200}
        p={2}
        mt={10}
        borderRadius={2}
        border="1px solid rgba(0, 0, 0, 0.25)"
        textAlign="center"
        sx={{
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white',
            boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
          },
        }}
        onClick={() => {
          navigate(`/`)
        }}
      >
        <span>Return Home</span>
      </Box>
    </Box>
  )
}
