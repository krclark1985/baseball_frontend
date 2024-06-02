import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ServerAddress } from 'src/constants/ServerAddress'

interface InningBoardProps {
  gameId: number
  topOfInning: boolean
}

export default function InningBoard({ gameId, topOfInning }: InningBoardProps) {
  const getInning = async () => {
    const response = await axios.get(`${ServerAddress}/game/${gameId}/inning`)

    return response.data
  }

  const inningQuery = useQuery({
    queryKey: ['inning'],
    queryFn: getInning,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (!inningQuery.data) {
    return null // TODO: Replace with loader
  }

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
          borderBottom: `10px solid ${topOfInning ? 'white' : 'gray'}`,
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
          borderTop: `10px solid ${!topOfInning ? 'white' : 'gray'}`,
        }}
      />
    </Box>
  )
}
