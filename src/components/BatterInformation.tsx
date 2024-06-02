import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Player } from 'src/types/Player'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import getTeamInfo from 'src/utils/getTeamInfo'
import { TeamColors } from 'src/team/TeamColors'

interface BatterInformationProps {
  gameId: number
  topOfInning: boolean
  teamsInfo: { team1_name: string; team2_name: string }
}

export default function BatterInformation({
  gameId,
  topOfInning,
  teamsInfo,
}: BatterInformationProps) {
  const getCurrentBatter = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${gameId}/current_batter`
    )

    return response.data
  }

  const currentTeam = topOfInning ? teamsInfo.team1_name : teamsInfo.team2_name

  const currentTeamInfo = getTeamInfo(currentTeam as keyof typeof TeamColors)

  const currentBatterQuery = useQuery({
    queryKey: ['batter'],
    queryFn: getCurrentBatter,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (!currentBatterQuery.data) {
    return <div />
  }

  const player = currentBatterQuery.data as Player

  return (
    <Box
      position="absolute"
      bottom={40}
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Box display="flex" width="70%" p={1} bgcolor="white">
        <Box width="100%" display="flex">
          <img
            style={{ width: 80 }}
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_150,q_auto:best/v1/people/${player.mlb_stats_id}/headshot/67/current`}
          />

          <Box
            display="flex"
            flexDirection="column"
            minWidth="calc(100% - 80px)"
            bgcolor="white"
          >
            <Box bgcolor={currentTeamInfo.bgColor} pl={4}>
              <Typography color="white" fontSize={24}>
                <span
                  style={{
                    marginRight: 24,
                    fontSize: 14,
                    padding: 4,
                  }}
                >
                  {player.primary_position}
                </span>
                <span style={{ fontWeight: 'bold' }}>{player.name}</span>
              </Typography>
            </Box>

            <Box bgcolor="rgba(0,0,0,.85)" p={2.25} display="flex">
              <Box
                width="33%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRight="1px solid white"
                color="white"
              >
                <Typography fontSize={32}>
                  {player.average.substring(1)}
                </Typography>
                <Box pt={1} ml={1}>
                  <Typography fontSize={18}>AVG</Typography>
                </Box>
              </Box>

              <Box
                width="33%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRight="1px solid white"
                color="white"
              >
                <Typography fontSize={32}>{player.homers}</Typography>
                <Box pt={1} ml={1}>
                  <Typography fontSize={18}>HR</Typography>
                </Box>
              </Box>

              <Box
                width="33%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="white"
              >
                <Typography fontSize={32}>{player.rbi}</Typography>
                <Box pt={1} ml={1}>
                  <Typography fontSize={18}>RBI</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
