import { useState } from 'react'
import './App.css'
import TeamPicker from './screens/TeamPicker'
import { Team } from './types/Team'
import LineupPicker from './screens/LineupPicker'
import StartGame from './screens/StartGame'

function App() {
  const [awayTeam, setAwayTeam] = useState<Team | null>(null)
  const [homeTeam, setHomeTeam] = useState<Team | null>(null)
  const [awayTeamLineup, setAwayTeamLineup] = useState<any>([])
  const [homeTeamLineup, setHomeTeamLineup] = useState<any>([])

  const areTeamsSelected = !!awayTeam && !!homeTeam
  const areLineupsFinished = awayTeamLineup.length > 0 && homeTeamLineup.length > 0

  console.log(awayTeamLineup)
  console.log(homeTeamLineup)

  return (
    <>
      {areTeamsSelected && (
        <div>
          Away team: {awayTeam.name}
          Home team: {homeTeam.name}
        </div>
      )}

      {!areTeamsSelected && (
        <TeamPicker
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          setHomeTeam={setHomeTeam}
          setAwayTeam={setAwayTeam}
        />
      )}

      {areTeamsSelected && (
        <>
          <LineupPicker 
            awayTeamId={awayTeam.id}
            homeTeamId={homeTeam.id}
            setAwayTeamLineup={setAwayTeamLineup}
            setHomeTeamLineup={setHomeTeamLineup}
            homeTeamLineup={homeTeamLineup}
            awayTeamLineup={awayTeamLineup}
          />
        </>
      )}
{/* 
      {areTeamsSelected && areLineupsFinished && (
        <StartGame />
      )}  */}
    </>
  )
}

export default App
