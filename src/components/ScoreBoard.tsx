import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { TeamColors } from '../team/TeamColors'

interface ScoreBoardProps {
  gameId: number
}

export default function ScoreBoard({ gameId }: ScoreBoardProps) {
  const getTeamsInfo = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/teams_info`
    )

    return response.data
  }

  const teamsInfoQuery = useQuery({
    queryKey: ['teamInfo'],
    queryFn: getTeamsInfo,
    retry: 1,
  })

  const getRuns = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${gameId}/runs`
    )

    return response.data
  }

  const runsQuery = useQuery({
    queryKey: ['runs'],
    queryFn: getRuns,
    retry: 1,
  })

  if (!teamsInfoQuery.data || !runsQuery.data) {
    return <div />
  }

  console.log('tteamsInfoQuery', teamsInfoQuery.data)

  const { team1_name, team2_name } = teamsInfoQuery.data
  const { team1_runs: homeScore, team2_runs: awayScore } = runsQuery.data

  const homeName = team1_name as keyof typeof TeamColors
  const awayName = team2_name as keyof typeof TeamColors

  const homeColorInfo = TeamColors[homeName] || {
    color: 'white',
    bgColor: 'blue',
  }
  const awayColorInfo = TeamColors[awayName] || {
    color: 'white',
    bgColor: 'blue',
  }

  return (
    <Box
      ml={5}
      width="100%"
      p={5}
      mt={5}
      bgcolor={TeamColors['San Diego Padres'].bgColor}
      maxWidth={400}
    >
      <Box
        display="flex"
        color={homeColorInfo.color}
        bgcolor={homeColorInfo.bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography px={2} fontWeight={600} width="100%" fontSize={26} py={4}>
          {homeName}
        </Typography>
        <Typography mr={3} fontWeight={600} fontSize={34}>
          {homeScore}
        </Typography>
      </Box>

      <Box width="100%" height="1px" bgcolor="white" />

      <Box
        display="flex"
        width="100%"
        color={awayColorInfo.color}
        bgcolor={awayColorInfo.bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography px={2} py={4} fontWeight={600} width="100%" fontSize={26}>
          {awayName}
        </Typography>
        <Typography mr={3} fontWeight={600} fontSize={34}>
          {awayScore}
        </Typography>
      </Box>
    </Box>
  )
}
