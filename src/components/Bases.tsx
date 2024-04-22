import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CSSProperties } from 'react'

interface BasesProps {
  gameId: number
}

export default function Bases({ gameId }: BasesProps) {
  const getOuts = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/outs`
    )

    return response.data
  }

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
    refetchOnWindowFocus: false,
  })

  const outsQuery = useQuery({
    queryKey: ['outs'],
    queryFn: getOuts,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const BoxStyle = {
    width: 30,
    height: 30,
    margin: 5,
  } as CSSProperties

  const OutsStyle = {
    width: 15,
    height: 15,
    borderRadius: '50%',
  } as CSSProperties

  if (!runnersQuery.data || outsQuery.error || outsQuery.isLoading) {
    return null // Replace with loader
  }

  // runnersQuery.data looks like { runner1: 0, runner2: 1, runner3: 2, runner4: 0}
  const basesWithRunners = Object.values(runnersQuery.data)

  return (
    <Box minHeight="100%" bgcolor="black" p={3} borderRight="1px solid white">
      <Box>
        <Box
          style={{
            transform: 'rotate(45deg)',
          }}
        >
          <Box display="flex">
            <Box
              style={{
                ...BoxStyle,
                backgroundColor: basesWithRunners.includes(1)
                  ? 'yellow'
                  : 'gray',
              }}
            />
            <Box
              style={{
                ...BoxStyle,
                backgroundColor: basesWithRunners.includes(2)
                  ? 'yellow'
                  : 'gray',
              }}
            />
          </Box>
          <Box display="flex">
            <Box
              style={{
                ...BoxStyle,
                backgroundColor: basesWithRunners.includes(3)
                  ? 'yellow'
                  : 'gray',
              }}
            />
            {/* This box is hidding make same bg color as the container div  */}
            <Box style={{ ...BoxStyle, backgroundColor: 'black' }} />
          </Box>
        </Box>

        <Box display="flex" width="100%" justifyContent="space-between" mt={2}>
          <Box
            style={{
              ...OutsStyle,
              backgroundColor: outsQuery.data > 0 ? 'yellow' : 'gray',
            }}
          />
          <Box
            style={{
              ...OutsStyle,
              backgroundColor: outsQuery.data > 1 ? 'yellow' : 'gray',
            }}
          />
          <Box
            style={{
              ...OutsStyle,
              backgroundColor: outsQuery.data > 2 ? 'yellow' : 'gray',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
