import { useParams } from 'react-router-dom'

function TeamPage (): JSX.Element {
  const { teamName } = useParams()
  return (
    <div>
      <h1>Team {teamName}</h1>
    </div>
  )
}

export default TeamPage
