import React from 'react';
import PropTypes from 'prop-types';

export default function Loading({ message, speed }) {
  const [count, setCount] = React.useState('');
  let interval = React.useRef(null);
  let memoizedCount = React.useMemo(() => count, [count]);

  React.useEffect(() => {
    interval.current = setInterval(() => {
      if (memoizedCount.length >= 3) {
        setCount('');
      } else {
        setCount((c) => c + '.');
      }
    }, speed);
    return () => clearInterval(interval.current);
  }, [memoizedCount.length, speed]);

  return (
    <div className='container'>
      <p className='text-center'>{`${message}${count}`}</p>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  message: 'Loading',
  speed: 300
};
