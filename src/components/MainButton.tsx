import Box, { BoxProps } from '@mui/material/Box'
import { ReactNode } from 'react'

interface MainButtonProps {
  boxProps?: BoxProps
  children: ReactNode
  onClick: () => void
}

export default function MainButton({
  boxProps,
  children,
  onClick,
}: MainButtonProps) {
  return (
    <Box
      style={{ cursor: 'pointer' }}
      maxWidth={200}
      p={2}
      borderRadius={2}
      border="1px solid rgba(0, 0, 0, 0.25)"
      textAlign="center"
      sx={{
        transition: 'all 0.25s ease',
        '&:hover': {
          backgroundColor: 'green',
          color: 'white',
          boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
        },
      }}
      onClick={onClick}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
