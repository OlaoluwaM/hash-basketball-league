import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './Error';
import NavBar from './NavBar';
import Loading from './Loading';

const Home = React.lazy(() => import('./Home'));
const Players = React.lazy(() => import('./Players'));
const Teams = React.lazy(() => import('./Teams'));
const TeamPage = React.lazy(() => import('./TeamPage'));
const Articles = React.lazy(() => import('./Articles'));

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/players' component={Players} />
            <Route path='/teams' component={Teams} />
            <Route path='/:teamId' exact component={TeamPage} />
            <Route path='/:teamId/articles' component={Articles} />
            <Route component={Error} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
