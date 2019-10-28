import React from 'react';
import { Route, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import { getTeamsArticles } from '../utils/api';
import Article from './Article';

export default function Articles() {
  const [teamsArticles, setArticles] = React.useState([]);
  const location = useLocation();
  const match = useRouteMatch();
  const { teamId } = useParams();

  React.useEffect(() => {
    getTeamsArticles(teamId)
      .then((articles) => articles.map(({ title }) => title))
      .then((title) => setArticles([...title]));
    return () => setArticles([]);
  }, [teamId]);

  const loading = teamsArticles.length === 0;
  const { url } = match;

  if (loading) return <h1>loading</h1>;
  return (
    <div className='container two-column'>
      <SideBar
        loading={loading}
        title='Articles'
        data={teamsArticles}
        match={match}
        location={location}
      />
      <Route
        path={`${url}/:articleId`}
        render={({ match }) => {
          const { articleId } = match.params;
          if (loading) return null;
          return (
            <div className='panel'>
              <Article articleId={articleId} teamId={teamId}>
                {(article) => {
                  return !article ? (
                    <h1>loading</h1>
                  ) : (
                    <article className='article'>
                      <h1 className='header'>{article.title}</h1>
                      <p>{article.body}</p>
                    </article>
                  );
                }}
              </Article>
            </div>
          );
        }}
      />
    </div>
  );
}
