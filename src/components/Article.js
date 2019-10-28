import React from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../utils/api';

export default function Article({ articleId, teamId, children }) {
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    getArticle(teamId, articleId).then((article) => setArticle(article));
    return () => setArticle(null);
  }, [teamId, articleId]);

  return children(article);
}

Article.propType = {
  teamId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};
