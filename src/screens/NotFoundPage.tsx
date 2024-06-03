import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import MainButton from 'src/components/MainButton'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography variant="h2" fontWeight={600}>
        {' '}
        Page Not Found{' '}
      </Typography>
      <MainButton boxProps={{ mt: 4 }} onClick={() => navigate('/')}>
        Return Home
      </MainButton>
    </Box>
  )
}
