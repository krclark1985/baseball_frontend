import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface BasesProps {
  gameId: number
}

export default function Bases({ gameId }: BasesProps) {
  const getRunners = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/runners`
    )

    return response.data
  }

  const runnersQuery = useQuery({
    queryKey: ['runners'],
    queryFn: getRunners,
    retry: 1,
  })

  console.log('weeee', runnersQuery.data)

  return <></>
}
