import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { ServerAddress } from 'src/constants/ServerAddress'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Box height="100vh" width="100vw">
      <Box p={5} position="relative">
        <img
          src="/mlb-flask-logo.jpg"
          style={{ width: '50vw', position: 'absolute', right: 0, zIndex: -1 }}
        />

        <Box>
          <Typography
            mt={4}
            color="#445E93"
            fontSize="10vw"
            fontWeight={700}
            style={{ textShadow: '3px 3px rgba(0, 0, 0, .10)' }}
            fontFamily="Playball"
          >
            Play Ball!
          </Typography>
          <Box
            width={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
            border="1px solid rgba(0, 0, 0, .25)"
            style={{ borderRadius: 4, cursor: 'pointer' }}
            p={3}
            position="relative"
            zIndex={100}
            sx={{
              background: 'linear-gradient(to right, #445E93 50%, #b40c44 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right bottom',
              transition: 'all 0.5s ease',
              '&:hover': {
                backgroundPosition: 'left bottom',
              },
            }}
            onClick={async () => {
              const response = await axios.post(`${ServerAddress}/game/create`)

              if (response.data) {
                navigate(`/game/${response.data}/team-pick`)
              }
            }}
          >
            <Typography
              fontSize={18}
              color="white"
              fontWeight={600}
              style={{ cursor: 'pointer' }}
            >
              Start New Game
            </Typography>
          </Box>
          <Box
            width={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
            border="1px solid rgba(0, 0, 0, .25)"
            style={{ borderRadius: 4, cursor: 'pointer' }}
            p={3}
            position="relative"
            zIndex={100}
            sx={{
              background: 'linear-gradient(to right, #b40c44 50%, #445E93 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right bottom',
              transition: 'all 0.5s ease',
              '&:hover': {
                backgroundPosition: 'left bottom',
              },
            }}
            onClick={() => {
              navigate(`/game/list`)
            }}
          >
            <Typography
              fontSize={18}
              color="white"
              fontWeight={600}
              style={{ cursor: 'pointer' }}
            >
              Find Existing Game
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
