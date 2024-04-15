import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingScreen from '../components/LoadingScreen'
import { useState } from 'react'

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
    const response = await axios.get('http://localhost:5000/teams')
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
      <Box>
        Please confirm these are the teams you want
        <Typography>away team - {awayTeam.name}</Typography>
        <Typography>home team - {homeTeam.name}</Typography>
        <Box>
          <button
            style={{ cursor: 'pointer' }}
            onClick={async () => {
              const response = await axios.put(
                `http://localhost:5000/game/${params.gameId}/team_info`,
                {
                  team1_id: awayTeam.id,
                  team1_name: awayTeam.name,
                  team2_id: homeTeam.id,
                  team2_name: homeTeam.name,
                }
              )

              console.log({
                team1_id: awayTeam.id,
                team1_name: awayTeam.name,
                team2_id: homeTeam.id,
                team2_name: homeTeam.name,
              })

              console.log(response)

              if (response.status === 200) {
                navigate(`/game/${params.gameId}/lineups/randomzie`)
              }
            }}
          >
            confirm
          </button>
        </Box>
        <Box>
          <button
            style={{ cursor: 'pointer', marginTop: 16 }}
            onClick={() => {
              setAwayTeam(null)
              setHomeTeam(null)
            }}
          >
            reset
          </button>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {!awayTeam
        ? 'Player 1 pick your away team'
        : 'Player 2 pick the home team'}

      {allTeams.length > 0 &&
        allTeams.map((team: Team) => {
          return (
            <div
              onClick={() => {
                if (!awayTeam) {
                  setAwayTeam(team)

                  return
                }

                setHomeTeam(team)
              }}
              key={team.mlb_id}
              style={{
                cursor: 'pointer',
                backgroundColor: 'green',
                padding: 12,
                color: 'white',
                textAlign: 'center',
                maxWidth: 300,
                borderRadius: 12,
                margin: 10,
                fontWeight: 'bold',
              }}
            >
              {team.name}
            </div>
          )
        })}
    </>
  )
}
