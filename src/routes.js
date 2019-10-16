import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Cards from './pages/Cards';
import Notes from './pages/Notes';
import Sites from './pages/Sites';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/sites" component={Sites} />
        <Route path="/cards" component={Cards} />
        <Route path="/notes" component={Notes} />
      </Switch>
    </BrowserRouter>
  );
}
