import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function GameCreator() {
  const navigate = useNavigate()

  useEffect(() => {
    const getNewGameId = async () => {
      const response = await axios.post(`http://localhost:5000/game/create`)
      const gameId = await response.data

      navigate(`/game/${gameId}/team-pick`)
    }

    getNewGameId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="80vw">
        <LinearProgress />
        working
      </Box>
    </Box>
  )
}
