// https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/694297/headshot/67/current

// v1/people/:playerId/headshot

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
  })

  console.log('currentBatterQuery.data', currentBatterQuery.data)

  if (!currentBatterQuery.data) {
    return <div />
  }

  const player = currentBatterQuery.data as Player

  return (
    <Box>
      <Typography>
        {player.name} - {player.primary_position}
      </Typography>
    </Box>
  )
}
