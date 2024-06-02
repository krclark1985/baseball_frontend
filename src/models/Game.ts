export module Game {
    export interface IndexRecord {
        active: boolean 
        id: number 
        team1_name: string | null 
        team2_name: string | null 
    }

    export interface Winner extends IndexRecord {
        winner: string 
        team1_runs: number 
        team2_runs: number
    }
}