import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Game from './components/game';
import Login from './components/login';

function App() {

  return (
    <div className="Tic-Tac-toe">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            component={Login}
            exact
          />
          <Route
            path="/game"
            component={Game}
            exact
          />
          <Redirect
            to="/"
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
