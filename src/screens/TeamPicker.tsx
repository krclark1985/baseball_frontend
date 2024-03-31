import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Team {
  id: number
  name: string
  mlb_id: number
}

export default function TeamPicker({
  awayTeam,
  homeTeam,
  setAwayTeam,
  setHomeTeam,
}: any) {
  const navigate = useNavigate()
  const [allTeams, setAllTeams] = useState([])

  const getTeams = async () => {
    const response = await fetch('http://localhost:5000/teams')
    const json = await response.json()
    setAllTeams(json)
  }

  useEffect(() => {
    getTeams()
  }, [])

  useEffect(() => {
    if (!!awayTeam && !!homeTeam) {
      navigate('/lineups')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awayTeam, homeTeam])

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
                } else {
                  setHomeTeam(team)
                }
              }}
              key={team.mlb_id}
              style={{
                cursor: 'pointer',
                backgroundColor: 'green',
                padding: 12,
                color: 'white',
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
