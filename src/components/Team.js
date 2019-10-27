import React from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../utils/api';

export default function Team({ id, children }) {
  const [team, setTeam] = React.useState(null);

  React.useEffect(() => {
    getTeam(id).then((team) => setTeam(team));
    return () => setTeam(null);
  }, [id]);

  return children(team);
}

Team.propType = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};
