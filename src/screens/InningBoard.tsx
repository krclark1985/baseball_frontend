import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface InningBoardProps {
  gameId: number
}

export default function InningBoard({ gameId }: InningBoardProps) {
  const getInning = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/inning`
    )

    return response.data
  }

  const getTopOfInning = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/top_of_inning`
    )

    return response.data
  }

  const inningQuery = useQuery({
    queryKey: ['inning'],
    queryFn: getInning,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const topOfInningQuery = useQuery({
    queryKey: ['top_of_inning'],
    queryFn: getTopOfInning,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (
    !inningQuery.data ||
    topOfInningQuery.error ||
    topOfInningQuery.isLoading
  ) {
    return null // TODO: Replace with loader
  }

  console.log('top of inning', topOfInningQuery.data)

  const topInning = !!topOfInningQuery.data

  return (
    <Box
      borderRight="1px solid white"
      bgcolor="black"
      py={2}
      px={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        style={{
          marginLeft: 3,
          marginBottom: 10,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: `10px solid ${topInning ? 'white' : 'gray'}`,
        }}
      />

      <Box
        bgcolor="black"
        color="white"
        fontSize={28}
        display="flex"
        alignItems="center"
      >
        {inningQuery.data}
      </Box>

      <Box
        style={{
          marginLeft: 3,
          marginTop: 10,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${!topInning ? 'white' : 'gray'}`,
        }}
      />
    </Box>
  )
}
