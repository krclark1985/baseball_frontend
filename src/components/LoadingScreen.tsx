import { LinearProgress } from '@mui/material'
import Box from '@mui/material/Box'

export default function LoadingScreen() {
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
      </Box>
    </Box>
  )
}
