import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { TeamColors } from 'src/team/TeamColors'
import getTeamInfo from 'src/utils/getTeamInfo'

interface ScoreBoardProps {
  gameId: number
  teamsInfo: { team1_name: string; team2_name: string }
}

export default function ScoreBoard({ gameId, teamsInfo }: ScoreBoardProps) {
  const getRuns = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${gameId}/runs`
    )

    return response.data
  }

  const runsQuery = useQuery({
    queryKey: ['runs'],
    queryFn: getRuns,
    retry: 1,
  })

  if (!teamsInfo || !runsQuery.data) {
    return <div />
  }

  const { team1_name, team2_name } = teamsInfo
  const { team1_runs: homeScore, team2_runs: awayScore } = runsQuery.data

  const homeName = team1_name as keyof typeof TeamColors
  const awayName = team2_name as keyof typeof TeamColors

  const homeTeamInfo = getTeamInfo(homeName)
  const awayTeamInfo = getTeamInfo(awayName)

  return (
    <Box minWidth={400}>
      <Box
        display="flex"
        color={homeTeamInfo.color}
        bgcolor={homeTeamInfo.bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box pl={2} pt={1}>
          <img src={`${homeTeamInfo.png}`} style={{ maxWidth: 70 }} />
        </Box>
        <Typography fontSize={30} color="white" textAlign="center">
          {homeTeamInfo.abbr}
        </Typography>
        <Typography
          mr={3}
          fontWeight={600}
          fontSize={34}
          textAlign="center"
          width={50}
        >
          {homeScore}
        </Typography>
      </Box>

      <Box width="100%" height="1px" bgcolor="white" />

      <Box
        display="flex"
        width="100%"
        color={awayTeamInfo.color}
        bgcolor={awayTeamInfo.bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box pl={2} pt={1}>
          <img src={`${awayTeamInfo.png}`} style={{ maxWidth: 70 }} />
        </Box>
        <Typography fontSize={30} color="white" textAlign="center">
          {awayTeamInfo.abbr}
        </Typography>
        <Typography
          mr={3}
          fontWeight={600}
          fontSize={34}
          textAlign="center"
          width={50}
        >
          {awayScore}
        </Typography>
      </Box>
    </Box>
  )
}
