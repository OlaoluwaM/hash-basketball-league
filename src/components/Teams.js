import React from 'react';
import SideBar from './SideBar';
import { Route, Link } from 'react-router-dom';
import { PanelHeader, DefaultText } from './Panel';
import { getTeamNames } from '../utils/api';
import Team from './Team';

export default function Teams({ location, match }) {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    getTeamNames().then((teams) => setTeams([...teams]));
  }, []);

  const loading = teams.length === 0;

  return (
    <div className='container two-column'>
      <SideBar title='Teams' loading={loading} location={location} match={match} data={teams} />
      {!loading && location.pathname === '/teams' && <DefaultText text='Select a Team' />}

      <Route
        path={`${match.url}/:team`}
        render={({ match }) => {
          const teamName = match.params.team;
          return (
            <div className='panel'>
              <Team id={teamName}>
                {(team) =>
                  team === null ? (
                    <h1>LOADING</h1>
                  ) : (
                    <div style={{ width: '100%' }}>
                      <PanelHeader url={team.id} title={team.name} forTeam={true}>
                        <ul className='info-list row'>
                          <li>
                            Established<div>{team.established}</div>
                          </li>
                          <li>
                            Manager<div>{team.manager}</div>
                          </li>
                          <li>
                            Coach<div>{team.coach}</div>
                          </li>
                        </ul>
                        <Link
                          className='center btn-main'
                          to={`/${team.id}`}>{`${team.name} Team Page`}</Link>
                      </PanelHeader>
                    </div>
                  )
                }
              </Team>
            </div>
          );
        }}
      />
    </div>
  );
}
