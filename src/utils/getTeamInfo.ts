import { TeamColors } from "../team/TeamColors"

export default function getTeamInfo(teamName: keyof typeof TeamColors) {
  return TeamColors[teamName] || {
    color: 'white',
    bgColor: 'blue',
  }
}