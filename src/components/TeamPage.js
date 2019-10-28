import React from 'react';
import { PanelHeader } from './Panel';
import { Link, Redirect } from 'react-router-dom';
import { getTeamsArticles, getTeamNames } from '../utils/api';
import Team from './Team';

export default function TeamPage({ match }) {
  const [articles, setArticles] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const teamId = match.params.teamId;

  React.useEffect(() => {
    Promise.all([getTeamsArticles(teamId), getTeamNames()]).then(([articles, teams]) => {
      setArticles([...articles]);
      setTeams([...teams]);
    });
    return () => {
      setArticles([]);
      setTeams([]);
    };
  }, [teamId]);

  const loading = articles.length === 0;

  if (teams.length > 0 && !teams.includes(teamId)) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <div className='panel'>
        <Team id={teamId}>
          {(team) =>
            !team ? (
              <h1>Loading</h1>
            ) : (
              <PanelHeader url={team.id} forTeam={true} title={team.name}>
                <h4 style={{ margin: 5 }}>
                  <Link
                    to={{
                      pathname: '/players',
                      search: `?teamId=${teamId}`
                    }}>
                    View Roster
                  </Link>
                </h4>
                <h4>Championships</h4>
                <ul className='championships'>
                  {team.championships.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
                <ul className='info-list row' style={{ width: '100%' }}>
                  <li>
                    Established <div>{team.established}</div>
                  </li>
                  <li>
                    Manager <div>{team.manager}</div>
                  </li>
                  <li>
                    Coach <div>{team.coach}</div>
                  </li>
                  <li>
                    Record <div>{team.record}</div>
                  </li>
                </ul>
                <h2 className='header'>Articles</h2>
                <ul className='articles'>
                  {loading && <h1>Please Wait</h1>}
                  {!loading &&
                    articles.map(({ date, id, title }) => (
                      <li key={id}>
                        <Link to={`${match.url}/articles/${id}`}>
                          <h4 className='article-title'>{title}</h4>
                          <div className='article-date'>{date.toLocaleDateString()}</div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </PanelHeader>
            )
          }
        </Team>
      </div>
    </div>
  );
}
