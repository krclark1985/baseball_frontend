import { useParams } from 'react-router-dom'

export default function GameListPage() {
  const { gameId } = useParams()

  console.log(gameId)

  return <>{gameId}</>
}
