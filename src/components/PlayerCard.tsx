import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Player } from '../types/Player'
import { useRef, useState } from 'react'
import Popover from '@mui/material/Popover'

interface PlayerCardProps {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const ref = useRef(null)
  const [showPopover, setShowPopover] = useState(false)

  return (
    <>
      <Box
        ref={ref}
        p={1}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        {player.name} - {player.primary_position}
      </Box>

      {ref && (
        <Popover
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          open={showPopover}
          anchorEl={ref.current}
          // https://github.com/mui/material-ui/issues/7212 popver immediately calls mouseleave
          style={{ pointerEvents: 'none' }}
        >
          <Box py={2} px={4}>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>AVG</span> - {player.average}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>RBI</span> - {player.rbi}
            </Typography>
            <Typography mb={2}>
              <span style={{ fontWeight: 'bold' }}>HR</span> - {player.homers}
            </Typography>
            <img
              style={{ width: 80 }}
              src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_150,q_auto:best/v1/people/${player.mlb_stats_id}/headshot/67/current`}
            />
          </Box>
        </Popover>
      )}
    </>
  )
}
