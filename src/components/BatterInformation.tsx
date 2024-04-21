import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Player } from '../types/Player'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface BatterInformationProps {
  gameId: number
}

export default function BatterInformation({ gameId }: BatterInformationProps) {
  const getCurrentBatter = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/current_batter`
    )

    return response.data
  }

  const currentBatterQuery = useQuery({
    queryKey: ['batter'],
    queryFn: getCurrentBatter,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (!currentBatterQuery.data) {
    return <div />
  }

  const player = currentBatterQuery.data as Player

  return (
    <Box ml={5} mt={3}>
      <Typography fontSize={24}>Current Batter</Typography>
      <Box
        p={3}
        bgcolor="black"
        maxWidth={600}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Typography color="white" fontSize={24}>
            {player.name} - {player.primary_position}
          </Typography>
          <Typography color="white" fontSize={24}>
            Avg - {player.average}
          </Typography>
          <Typography color="white" fontSize={24}>
            Homeruns - {player.homers}
          </Typography>
          <Typography color="white" fontSize={24}>
            RBI - {player.rbi}
          </Typography>
        </Box>
        <img
          src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${player.mlb_stats_id}/headshot/67/current`}
        />
      </Box>
    </Box>
  )
}
