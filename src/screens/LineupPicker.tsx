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
    awayTeamId: number, 
    homeTeamId: number, 
    homeTeamLineup: any[], 
    awayTeamLineup: any[]
    setAwayTeamLineup: (players: any[]) => void,  
    setHomeTeamLineup: (players: any[]) => void,  
    gameId: number
}) {
    const [hasSent, setHasSent] = useState(false)

    const getPlayers = async (type: 'away' | 'home') => {
        let response = type === 'away' 
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
            home: homeTeamLineup
        })

        const response = await fetch(`http://localhost:5000/lineups/${gameId}`, {
            method: 'POST', 
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Accept":'application/json', 
                // "Access-Control-Allow-Origin": "*"
            },
            body: payload
        })

        console.log('response', response)

        const json = await response.json() 
        console.log(json)
    }

    useEffect(() => {
        getPlayers('away') 
        getPlayers('home')
    }, [])

    useEffect(() => {
        if (!homeTeamLineup || !awayTeamLineup || hasSent) {
            return
        }

        postLineups()
        setHasSent(true)
    }, [homeTeamLineup, awayTeamLineup])

    return (
        <>
            players here
        </>
    )
}