import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import Box from '@mui/material/Box'
import { Player } from '../types/Player'

export default function LineupGenerator() {
  const params = useParams()
  const queryClient = useQueryClient()

  const getTeamInfo = async () => {
    const response = await axios.get(
      `http://localhost:5000/game/${params.gameId}/teams_info`
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
      `http://localhost:5000/players/${teamId}/random`
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

  // const getRandomTeam = async () => {
  //   const response = await axios.get(`http://localhost:5000`)
  // }

  // const team1Random = useQuery({
  //   queryKey:
  // })

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
    <>
      <Box display="flex">
        <Box>
          Away team lineup
          {awayTeam.map((player) => (
            <div> {player.name} </div>
          ))}
        </Box>
        <Box ml={4}>
          Home team lineup
          {homeTeam.map((player) => (
            <div> {player.name} </div>
          ))}
        </Box>
      </Box>

      <button
        style={{ marginRight: 20 }}
        onClick={async () => {
          const response = await axios.post(
            `http://localhost:5000/lineups/${params.gameId}`,
            {
              away: awayTeam,
              home: homeTeam,
            }
          )

          const json = await response.data

          console.log('JSON: ', json)
        }}
      >
        confirm
      </button>

      <button
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['random_team1'] })
          queryClient.invalidateQueries({ queryKey: ['random_team2'] })
        }}
      >
        randomize
      </button>
    </>
  )
}
