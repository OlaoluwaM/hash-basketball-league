import React from 'react';
import { Route, Link } from 'react-router-dom';
import SideBar from './SideBar';
import { getPlayers } from '../utils/api';
import { parse } from 'query-string';
import slug from 'slug';
import { PanelHeader, DefaultText } from './Panel';
import normalize from '../utils/normalize';
import Loading from './Loading';

export default function Players({ location, match }) {
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    if (location.search) {
      const { teamId } = parse(location.search);
      getPlayers(teamId).then((players) => setPlayers([...players]));
    } else getPlayers().then((players) => setPlayers([...players]));
    return () => setPlayers([]);
  }, [location.search]);

  const loading = players.length === 0;

  return (
    <div className='container two-column'>
      <SideBar
        loading={loading}
        location={location}
        match={match}
        title='Players'
        data={players.map(({ name }) => name)}
      />
      {!loading && location.pathname === '/players' && <DefaultText text='Select a Player' />}

      <Route
        path={`${match.url}/:player`}
        render={({ match }) => {
          const playerName = match.params.player;
          const { avatar, name, number, position, teamId, ppg, apg, rpg, spg } = players.find(
            ({ name }) => slug(name) === playerName
          );

          if (loading) return <Loading message={`Bringing out ${name}`} />;

          return (
            <div className='panel'>
              <PanelHeader url={avatar} title={name} subheading={`#${number}`}>
                <div className='row'>
                  <ul
                    className='info-list'
                    style={{
                      marginRight: 80
                    }}>
                    <li>
                      Team
                      <div>
                        <Link to={`/${teamId}`}>{normalize(teamId)}</Link>
                      </div>
                    </li>
                    <li>
                      Postion<div>{position}</div>
                    </li>
                    <li>
                      PPG<div>{ppg}</div>
                    </li>
                  </ul>
                  <ul className='info-list'>
                    <li>
                      APG<div>{apg}</div>
                    </li>
                    <li>
                      SPG<div>{spg}</div>
                    </li>
                    <li>
                      RPG<div>{rpg}</div>
                    </li>
                  </ul>
                </div>
              </PanelHeader>
            </div>
          );
        }}
      />
    </div>
  );
}
