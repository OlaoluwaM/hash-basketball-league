import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import slug from 'slug';
import Loading from './Loading';

function CustomLink({ to, children }) {
  const { pathname } = to;
  return (
    <Route
      path={pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: 'none',
            fontWeight: match ? 'bold' : 'normal'
          }}>
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
}

export default function SideBar({ title, data, loading, location, match }) {
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <h3 className='header'>{title}</h3>
        <ul className='sidebar-list'>
          {data.map((item) => {
            return (
              <CustomLink
                key={item}
                to={{
                  pathname: `${match.url}/${slug(item)}`,
                  search: location.search
                }}>
                {item.toUpperCase()}
              </CustomLink>
            );
          })}
        </ul>
      </div>
    );
  }
}

SideBar.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};
