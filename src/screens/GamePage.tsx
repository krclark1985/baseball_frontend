import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ScoreBoard from '../components/ScoreBoard'
import BatterInformation from '../components/BatterInformation'
import Bases from '../components/Bases'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InningBoard from './InningBoard'
import PitchCount from './PitchCount'
import LoadingScreen from '../components/LoadingScreen'
import { useEffect } from 'react'
import HomeRunModal from '../components/HomeRun/HomeRunModal'

export default function GamePage() {
  const { gameId } = useParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]

    body.style.background = `url('../../public/field-2-bg.jpg') no-repeat top center fixed`
    body.style.backgroundSize = 'cover'
  }, [])

  const getTeamsInfo = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${gameId}/teams_info`
    )

    return response.data
  }

  const getHitOutcome = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${gameId}/hit_outcome`
    )

    return response.data
  }

  const getTopOfInning = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${gameId}/top_of_inning`
    )

    return response.data
  }

  const teamsInfoQuery = useQuery({
    queryKey: ['teamInfo'],
    queryFn: getTeamsInfo,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const topOfInningQuery = useQuery({
    queryKey: ['top_of_inning'],
    queryFn: getTopOfInning,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const hitOutcomeQuery = useQuery({
    queryKey: ['hit_outcome'],
    queryFn: getHitOutcome,
    refetchOnWindowFocus: false,
  })

  const invalidateQueries = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['strikes'] })
      queryClient.invalidateQueries({ queryKey: ['balls'] })
      queryClient.invalidateQueries({ queryKey: ['runners'] })
      queryClient.invalidateQueries({ queryKey: ['runs'] })
      queryClient.invalidateQueries({ queryKey: ['hit_outcome'] })
      queryClient.invalidateQueries({ queryKey: ['batter'] })
      queryClient.invalidateQueries({ queryKey: ['inning'] })
      queryClient.invalidateQueries({ queryKey: ['top_of_inning'] })
      queryClient.invalidateQueries({ queryKey: ['outs'] })
    }, 500)
  }

  if (!teamsInfoQuery.data) {
    return <LoadingScreen />
  }

  return (
    <>
      <Box width="100%" p={1} mt={2} display="flex" justifyContent="center">
        <Box bgcolor="white" p={1} display="flex">
          <Box>
            <ScoreBoard
              gameId={Number(gameId) as any}
              teamsInfo={teamsInfoQuery.data}
            />
          </Box>
          <InningBoard
            gameId={Number(gameId) as number}
            topOfInning={topOfInningQuery.data}
          />
          <Bases gameId={Number(gameId) as number} />
          <PitchCount gameId={Number(gameId) as number} />
        </Box>
      </Box>

      <BatterInformation
        gameId={Number(gameId) as any}
        topOfInning={topOfInningQuery.data}
        teamsInfo={teamsInfoQuery.data}
      />

      <Box p={3} display="flex" flexWrap="wrap">
        <Box width="400px">
          <Box
            sx={{
              border: '2px solid green',
              padding: 2.5,
              borderRadius: 4,
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 2,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: 'green',
                color: 'white',
                boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
              },
            }}
            onClick={() => {
              axios.get(
                `${
                  import.meta.env.VITE_SERVER_ADDRESS
                }/game/${gameId}/pitch/${1}`
              )

              invalidateQueries()
            }}
          >
            Swing at pitch
          </Box>

          <Box
            sx={{
              border: '2px solid #F0B241',
              padding: 2.5,
              borderRadius: 4,
              fontSize: 18,
              textAlign: 'center',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#F0B241',
                color: 'white',
                boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
              },
            }}
            onClick={() => {
              axios.get(
                `${
                  import.meta.env.VITE_SERVER_ADDRESS
                }/game/${gameId}/pitch/${2}`
              )

              invalidateQueries()
            }}
          >
            Take pitch
          </Box>
        </Box>

        <Box
          p={5}
          bgcolor="white"
          borderRadius={4}
          justifyContent="center"
          ml={4}
          alignItems="center"
          border="1px solid rgba(0,0,0,0.5)"
        >
          <Box>
            {hitOutcomeQuery.data === 'Home run!!!' && <HomeRunModal />}
            <Typography fontSize={42} fontWeight={600}>
              {hitOutcomeQuery.data}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
