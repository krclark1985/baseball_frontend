export default function StartGameButton({
  awayTeam, 
  homeTeam, 
}: {
  awayTeam: any[]
  homeTeam: any[]
}) {
  return (
    <div 
      style={{ marginTop: 30, backgroundColor: 'blue', color: 'white', padding: 10, maxWidth: 100, }}
      onClick={async () => {
        
      }}
    >
      Start Game
    </div>
  )
}