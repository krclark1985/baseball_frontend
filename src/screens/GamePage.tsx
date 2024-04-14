import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ScoreBoard from '../components/ScoreBoard'
import BatterInformation from '../components/BatterInformation'

export default function GamePage() {
  const { gameId } = useParams()

  const getInning = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/inning`
    )

    return response.data
  }

  // const getOutcome = async () => {
  //   const response = await axios.get(
  //     `http://localhost:5000/game/${gameId}/pitch/${1}`
  //   )

  //   return response.data
  // }

  const getOuts = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/outs`
    )

    return response.data
  }

  const getRunners = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/runners`
    )

    return response.data
  }

  const inningQuery = useQuery({
    queryKey: ['inning'],
    queryFn: getInning,
    retry: 1,
  })

  // const outcomeQuery = useQuery({
  //   queryKey: ['outcome'],
  //   queryFn: getOutcome,
  //   retry: 1,
  // })

  const outsQuery = useQuery({
    queryKey: ['outs'],
    queryFn: getOuts,
    retry: 1,
  })

  const runnersQuery = useQuery({
    queryKey: ['runners'],
    queryFn: getRunners,
    retry: 1,
  })

  console.log('inning', inningQuery.data)
  // console.log(outcomeQuery.data)
  console.log('outs', outsQuery.data)

  return (
    <>
      <ScoreBoard gameId={gameId as any} />
      <BatterInformation gameId={gameId as any} />

      <div>inning: {inningQuery.data}</div>
      <div>outs: {outsQuery.data}</div>
      {/* <div>outcome: {outcomeQuery.data}</div> */}

      {/* {gameId} */}
    </>
  )
}
