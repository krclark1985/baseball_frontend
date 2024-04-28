import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PitchCountProps {
  gameId: number
}

export default function PitchCount({ gameId }: PitchCountProps) {
  const getStrikeCount = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/strikes`
    )

    return response.data
  }

  const getBallCount = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/balls`
    )

    return response.data
  }

  const strikesQuery = useQuery({
    queryKey: ['strikes'],
    queryFn: getStrikeCount,
    retry: 1,
  })

  const ballsQuery = useQuery({
    queryKey: ['balls'],
    queryFn: getBallCount,
    retry: 1,
  })

  if (
    strikesQuery.error ||
    strikesQuery.isLoading ||
    ballsQuery.error ||
    ballsQuery.isLoading
  ) {
    return false
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      p={3}
      bgcolor="black"
      minWidth={60}
      justifyContent="center"
    >
      <Typography color="white" fontSize={28}>
        {ballsQuery.data} - {strikesQuery.data}
      </Typography>
    </Box>
  )
}
