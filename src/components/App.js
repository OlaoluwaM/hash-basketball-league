import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import NavBar from './NavBar';
import Error from './Error';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/players' component={Players} />
          <Route path='/teams' component={Teams} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
