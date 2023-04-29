import React from 'react'
import Navbar from "./Navbar"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WatchSection from './WatchSection';
import ViewWatch from "./ViewWatch";
import { ContextGlobal } from "./ContextGlobal";
import './index.css';



const App = () => {
  return <BrowserRouter>
      <ContextGlobal>
        <Navbar />
        <Switch>
          <Route path="/" exact component={WatchSection} />
          <Route exact path="/watch/:id" component={ViewWatch} />
        </Switch>
      </ContextGlobal>
  </BrowserRouter>
}

export default App;
