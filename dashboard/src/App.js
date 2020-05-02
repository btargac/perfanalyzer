import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from './routes';
import logo from './images/logo.svg';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <h2 className="app__motto">Perfanalyzer Metrics Visualised</h2>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;
