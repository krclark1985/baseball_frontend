import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Player } from '../types/Player'

export default function LineupGenerator() {
  const params = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const getTeamInfo = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/game/${params.gameId}/teams_info`
    )
    const json = await response.data

    return json
  }

  const teamInfoQuery = useQuery({
    queryKey: ['team_info'],
    queryFn: getTeamInfo,
  })

  const { team1_id, team2_id } = teamInfoQuery.data || {}

  const getRandomTeam = async (teamId: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_ADDRESS}/players/${teamId}/random`
    )
    const json = await response.data

    return json
  }

  const randomTeamPlayers1Query = useQuery({
    queryKey: ['random_team1'],
    queryFn: () => getRandomTeam(team1_id),
    enabled: !!team1_id,
    refetchOnWindowFocus: false,
  })

  const randomTeamPlayers2Query = useQuery({
    queryKey: ['random_team2'],
    queryFn: () => getRandomTeam(team2_id),
    enabled: !!team2_id,
    refetchOnWindowFocus: false,
  })

  if (
    !teamInfoQuery.data ||
    !randomTeamPlayers1Query.data ||
    !randomTeamPlayers2Query.data
  ) {
    return <LoadingScreen />
  }

  const awayTeam = randomTeamPlayers1Query.data as Player[]
  const homeTeam = randomTeamPlayers2Query.data as Player[]

  return (
    <Box p={3}>
      <Box display="flex" mb={5}>
        <Box mr={15}>
          <Typography variant="h4">Away lineup</Typography>
          {awayTeam.map((player) => (
            <div key={player.id}>
              {' '}
              {player.name} - {player.primary_position}{' '}
            </div>
          ))}
        </Box>
        <Box ml={4}>
          <Typography variant="h4">Home lineup</Typography>
          {homeTeam.map((player) => (
            <div key={player.id}>
              {' '}
              {player.name} - {player.primary_position}{' '}
            </div>
          ))}
        </Box>
      </Box>

      <Box
        maxWidth={200}
        p={2}
        borderRadius={2}
        border="1px solid rgba(0, 0, 0, 0.25)"
        textAlign="center"
        style={{ cursor: 'pointer', marginTop: 16 }}
        sx={{
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white',
            boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
          },
        }}
        onClick={async () => {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_ADDRESS}/lineups/${params.gameId}`,
            {
              away: awayTeam,
              home: homeTeam,
            }
          )

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const json = await response.data // TOOD: CHeck json response

          if (!json) {
            console.log('something went wrong')
          }

          navigate(`/game/${params.gameId}`)
        }}
      >
        Start Game
      </Box>

      <Box
        maxWidth={200}
        p={2}
        borderRadius={2}
        border="1px solid rgba(0, 0, 0, 0.25)"
        textAlign="center"
        style={{ cursor: 'pointer', marginTop: 16 }}
        sx={{
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: '#445E93',
            color: 'white',
            boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
          },
        }}
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['random_team1'] })
          queryClient.invalidateQueries({ queryKey: ['random_team2'] })
        }}
      >
        Randomize
      </Box>
    </Box>
  )
}
