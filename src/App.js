import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      //<div style={{ backgroundColor: "gray" }}>
      <div>
        <Router>
          <Navbar />
          {/* <News pageSize={5} country="in" category="sPOrts" /> */}
          <Switch>
            <Route exact key="general" path="/"><News pageSize={5} country="in" category="general" /></Route>
            <Route exact key="business" path="/business"><News pageSize={5} country="in" category="business" /></Route>
            <Route exact key="entertainment" path="/entertainment"><News pageSize={5} country="in" category="entertainment" /></Route>
            <Route exact key="general" path="/general"><News pageSize={5} country="in" category="general" /></Route>
            <Route exact key="health" path="/health"><News pageSize={5} country="in" category="health" /></Route>
            <Route exact key="science" path="/science"><News pageSize={5} country="in" category="science" /></Route>
            <Route exact key="sports" path="/sports"><News pageSize={5} country="in" category="sports" /></Route>
            <Route exact key="technology" path="/technology"><News pageSize={5} country="in" category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

