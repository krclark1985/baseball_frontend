import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ScoreBoard from '../components/ScoreBoard'
import BatterInformation from '../components/BatterInformation'
import Bases from '../components/Bases'

export default function GamePage() {
  const { gameId } = useParams()
  const queryClient = useQueryClient()

  const getInning = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/inning`
    )

    return response.data
  }

  const getOuts = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/outs`
    )

    return response.data
  }

  const getHitOutcome = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/hit_outcome`
    )

    return response.data
  }

  const inningQuery = useQuery({
    queryKey: ['inning'],
    queryFn: getInning,
    retry: 1,
  })

  const outsQuery = useQuery({
    queryKey: ['outs'],
    queryFn: getOuts,
    retry: 1,
  })

  const hitOutcomeQuery = useQuery({
    queryKey: ['hit_outcome'],
    queryFn: getHitOutcome,
  })

  console.log('inning', inningQuery.data)
  console.log('outs', outsQuery.data)

  return (
    <>
      <ScoreBoard gameId={Number(gameId) as any} />
      <BatterInformation gameId={Number(gameId) as any} />
      <Bases gameId={Number(gameId) as number} />

      <div>inning: {inningQuery.data}</div>
      <div>outs: {outsQuery.data}</div>
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
        }}
      >
        take swing
      </button>
    </>
  )
}
