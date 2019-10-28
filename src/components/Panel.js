import React from 'react';
import PropTypes from 'prop-types';
import TeamLogo from './TeamLogo';

export function PanelHeader({ url, title, subheading, children, forTeam }) {
  return (
    <React.Fragment>
      {forTeam && <TeamLogo id={url} className='center' />}
      {!forTeam && <img className='avatar' src={url} alt={`${title}'s avatar`} />}
      <h1 className='medium-header'>{title}</h1>
      {subheading && <h3 className='header'>{subheading}</h3>}
      {children}
    </React.Fragment>
  );
}

export function DefaultText({ text }) {
  return <div className='sidebar-instruction'>{text}</div>;
}

PanelHeader.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  forTeam: PropTypes.bool
};

PanelHeader.defaultProps = {
  forTeam: false
};

DefaultText.propTypes = {
  text: PropTypes.string.isRequired
};
