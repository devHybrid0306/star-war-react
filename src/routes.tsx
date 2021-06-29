import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { paths } from './constants';
import FavoritePage from './containers/favorite';
import MainPage from './containers/main';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={paths.main} component={MainPage} />
      <Route exact path={paths.favorite} component={FavoritePage} />
      <Redirect to={paths.main} />
    </Switch>
  );
};

export default AppRoutes;
