import React from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import { getTeamNames } from '../utils/api';

export default function Home() {
  const [teams, setTeams] = React.useState([]);
  React.useEffect(() => {
    getTeamNames().then((teams) => setTeams([...teams]));
    return () => setTeams([]);
  }, []);
  console.log(teams);
  return (
    <div className='container'>
      <h1 className='large-header'>Hash History Basketball League</h1>
      <h3 className='header text-center'>Select a team</h3>
      <div className='home-grid'>
        {teams.map((team) => (
          <Link key={team} to={`/${team}`}>
            <TeamLogo width='125px' id={team} />
          </Link>
        ))}
      </div>
    </div>
  );
}
