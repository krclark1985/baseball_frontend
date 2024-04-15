import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      Start new game
      <button
        onClick={() => {
          navigate('/game-create')
        }}
      >
        New Game
      </button>
    </>
  )
}
