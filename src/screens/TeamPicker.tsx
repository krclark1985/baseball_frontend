import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingScreen from '../components/LoadingScreen'
import { useState } from 'react'
import { TeamColors } from '../team/TeamColors'
import Grid from '@mui/material/Grid'
import { ServerAddress } from 'src/constants/ServerAddress'

interface Team {
  id: number
  name: string
  mlb_id: number
}

export default function TeamPicker() {
  const navigate = useNavigate()
  const params = useParams()
  const [awayTeam, setAwayTeam] = useState<Team | null>(null)
  const [homeTeam, setHomeTeam] = useState<Team | null>(null)

  const getTeams = async () => {
    const response = await axios.get(`${ServerAddress}/teams`)
    const json = await response.data

    return json
  }

  const teamsQuery = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })

  if (!teamsQuery.data) {
    return <LoadingScreen />
  }

  const allTeams = teamsQuery.data

  if (awayTeam && homeTeam) {
    return (
      <Box p={3}>
        <Typography variant="h6" mb={10}>
          Please confirm these are the teams you want
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          maxWidth={800}
          margin="24px auto"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontWeight={600} mb={2} variant="h4" textAlign="center">
              {awayTeam.name}
            </Typography>
            <img
              src={`${TeamColors[awayTeam.name].png}`}
              style={{ maxWidth: '100%', width: 250 }}
            />
          </Box>

          <Typography
            fontWeight={600}
            variant="h2"
            color="#445E93"
            mr={7}
            ml={7}
          >
            VS
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontWeight={600} mb={2} variant="h4" textAlign="center">
              {homeTeam.name}
            </Typography>
            <img
              src={`${TeamColors[homeTeam.name].png}`}
              style={{ maxWidth: '100%', width: 250 }}
            />
          </Box>
        </Box>
        <Box>
          <Box
            style={{ cursor: 'pointer' }}
            maxWidth={200}
            p={2}
            mt={10}
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
            onClick={async () => {
              const response = await axios.put(
                `${ServerAddress}/game/${params.gameId}/team_info`,
                {
                  team1_id: awayTeam.id,
                  team1_name: awayTeam.name,
                  team2_id: homeTeam.id,
                  team2_name: homeTeam.name,
                }
              )

              if (response.status === 200) {
                navigate(`/game/${params.gameId}/lineups/randomize`)
              }
            }}
          >
            <span>Continue to Lineup</span>
          </Box>
        </Box>
        <Box>
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
                backgroundColor: '#b40c44',
                color: 'white',
                boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.25)',
              },
            }}
            onClick={() => {
              setAwayTeam(null)
              setHomeTeam(null)
            }}
          >
            Reset Teams
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography fontFamily="PlayBall" variant="h3">
        {!awayTeam ? 'Player 1' : 'Player 2'}
      </Typography>
      <Typography mb={3}>Pick your team!</Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        columnGap={3}
        rowGap={3}
      >
        {allTeams.length > 0 &&
          allTeams.map((team: Team) => {
            const teamName = team.name as any

            if (team.id === awayTeam?.id) {
              return null
            }

            return (
              <Grid
                item
                xs={2}
                rowSpacing={1}
                columnSpacing={2}
                lg={2}
                md={2}
                sm={2}
                xl={2}
                borderRadius={2}
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.20)',
                  },
                }}
                p={1}
                border={'1px solid rgba(0, 0, 0, 0.2)'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!awayTeam) {
                    setAwayTeam(team)

                    return
                  }

                  setHomeTeam(team)
                }}
                key={team.mlb_id}
              >
                {TeamColors[teamName] && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      style={{ width: 100 }}
                      src={`${TeamColors[teamName].png}`}
                    />
                  </Box>
                )}
              </Grid>
            )
          })}
      </Grid>
    </Box>
  )
}
