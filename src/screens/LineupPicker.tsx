import { useEffect, useState } from 'react'

export default function LineupPicker({
  awayTeamId,
  homeTeamId,
  setAwayTeamLineup,
  setHomeTeamLineup,
  homeTeamLineup,
  awayTeamLineup,
  gameId = 1,
}: {
  awayTeamId: number
  homeTeamId: number
  homeTeamLineup: unknown[]
  awayTeamLineup: unknown[]
  setAwayTeamLineup: (players: unknown) => void
  setHomeTeamLineup: (players: unknown) => void
  gameId: number
}) {
  const [hasSent, setHasSent] = useState(false)

  const getPlayers = async (type: 'away' | 'home') => {
    const response =
      type === 'away'
        ? await fetch(`http://localhost:5000/players/${awayTeamId}`)
        : await fetch(`http://localhost:5000/players/${homeTeamId}`)

    const json = await response.json()

    if (type === 'away') {
      const awayArr = []
      for (let i = 0; i < 9; i++) {
        awayArr.push(json[i])
      }

      setAwayTeamLineup(awayArr)
    } else {
      setHomeTeamLineup(json)

      const homeArr = []
      for (let i = 0; i < 9; i++) {
        homeArr.push(json[i])
      }

      setHomeTeamLineup(homeArr)
    }
  }

  const postLineups = async () => {
    const payload = JSON.stringify({
      away: awayTeamLineup,
      home: homeTeamLineup,
    })

    const response = await fetch(`http://localhost:5000/lineups/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: payload,
    })

    const json = await response.json()
    console.log(json)
  }

  const createGame = async () => {
    const payload = JSON.stringify({
      away: awayTeamLineup,
      home: homeTeamLineup,
    })

    const response = await fetch(`http://localhost:5000/game/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: payload,
    })

    const json = await response.json()
    console.log(json)
  }

  useEffect(() => {
    getPlayers('away')
    getPlayers('home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!homeTeamLineup || !awayTeamLineup || hasSent) {
      return
    }

    setHasSent(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeTeamLineup, awayTeamLineup])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 30 }}>
          Home Team
          {homeTeamLineup.map((player: any) => {
            return <div key={player.name}>{player.name}</div>
          })}
        </div>
        <div>
          Away Team
          {awayTeamLineup.map((player: any) => {
            return <div key={player.name}>{player.name}</div>
          })}
        </div>
      </div>

      {!!homeTeamLineup && !!awayTeamLineup && (
        <div
          style={{ marginTop: 20, cursor: 'pointer' }}
          onClick={() => {
            postLineups()
            createGame()
          }}
        >
          Start Game
        </div>
      )}
    </>
  )
}
