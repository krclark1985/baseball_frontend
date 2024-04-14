import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function GameListPage() {
  const { gameId } = useParams()

  // const getGames = async () => {
  //   const response = await axios.get()
  // }

  return <>{gameId}</>
}
