import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ScoreBoard from '../components/ScoreBoard'
import BatterInformation from '../components/BatterInformation'
import Bases from '../components/Bases'
import Box from '@mui/material/Box'
import InningBoard from './InningBoard'
import PitchCount from './PitchCount'

export default function GamePage() {
  const { gameId } = useParams()
  const queryClient = useQueryClient()

  const getHitOutcome = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/hit_outcome`
    )

    return response.data
  }

  const hitOutcomeQuery = useQuery({
    queryKey: ['hit_outcome'],
    queryFn: getHitOutcome,
  })

  return (
    <>
      <Box ml={5} width="100%" p={1} mt={5} maxWidth={400} display="flex">
        <ScoreBoard gameId={Number(gameId) as any} />
        <InningBoard gameId={Number(gameId) as number} />
        <Bases gameId={Number(gameId) as number} />
        <PitchCount gameId={Number(gameId) as number} />
      </Box>
      <BatterInformation gameId={Number(gameId) as any} />

      <div>hit outcome: {hitOutcomeQuery.data}</div>

      <button
        onClick={() => {
          axios.get(`http://localhost:5000/game/${gameId}/pitch/${1}`)

          queryClient.invalidateQueries({ queryKey: ['batter'] })
          queryClient.invalidateQueries({ queryKey: ['outs'] })
          queryClient.invalidateQueries({ queryKey: ['runners'] })
          queryClient.invalidateQueries({ queryKey: ['inning'] })
          queryClient.invalidateQueries({ queryKey: ['runs'] })
          queryClient.invalidateQueries({ queryKey: ['hit_outcome'] })
          queryClient.invalidateQueries({ queryKey: ['strikes'] })
          queryClient.invalidateQueries({ queryKey: ['balls'] })
          queryClient.invalidateQueries({ queryKey: ['top_of_inning'] })
        }}
      >
        take swing
      </button>
    </>
  )
}
