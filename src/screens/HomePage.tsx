import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <Box height="100vh" width="100vw" bgcolor="#FFFFF6">
      <Box p={5}>
        <img src="/mlb-flask-logo.jpg" style={{ width: 200 }} />
        <Box>
          <Typography
            mt={4}
            color="#445E93"
            fontSize={72}
            fontWeight={700}
            style={{ textShadow: '3px 3px rgba(0, 0, 0, .10)' }}
            fontFamily="Playball"
          >
            Play Ball
          </Typography>
          <button
            onClick={() => {
              navigate('/game-create')
            }}
          >
            New Game
          </button>
        </Box>
      </Box>
    </Box>
  )
}
