import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function GamePage() {
  const { gameId } = useParams()

  console.log(gameId)

  const getTeamName = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/teams_info`
    )

    return response.data
  }

  const team1Query = useQuery({
    queryKey: ['teamInfo'],
    queryFn: getTeamName,
    retry: 1,
  })

  console.log(team1Query.data)

  return <>{gameId}</>
}
