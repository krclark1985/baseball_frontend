import Typography from '@mui/material/Typography'
import ConfettiExplosion from 'react-confetti-explosion'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'

export default function HomeRunModal() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={isOpen} fullScreen>
      <Box display="flex" justifyContent="space-around">
        <ConfettiExplosion zIndex={999999999} />
        <ConfettiExplosion zIndex={999999999} />
      </Box>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            '@keyframes alterSize': {
              '0%': {
                fontSize: '50px',
              },
              '50%': {
                fontSize: '90px',
              },
              '100%': {
                fontSize: '50px',
              },
            },
            animation: 'alterSize 1.25s ease-in-out infinite',
          }}
          variant="h2"
        >
          HOME RUN!
        </Typography>
      </Box>
    </Dialog>
  )
}
