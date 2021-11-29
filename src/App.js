import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 5;
  const api = process.env.REACT_APP_API_KEY

  const [progress, setProgress] = useState(20);


  return (
    //<div style={{ backgroundColor: "gray" }}>
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        {/* <News setProgress = {setProgress}  pageSize={pageSize} country="in" category="sPOrts" /> */}
        <Switch>
          <Route exact key="general" path="/"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="general" /></Route>
          <Route exact key="business" path="/business"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="business" /></Route>
          <Route exact key="entertainment" path="/entertainment"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="entertainment" /></Route>
          <Route exact key="general" path="/general"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="general" /></Route>
          <Route exact key="health" path="/health"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="health" /></Route>
          <Route exact key="science" path="/science"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="science" /></Route>
          <Route exact key="sports" path="/sports"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="sports" /></Route>
          <Route exact key="technology" path="/technology"><News setProgress={setProgress} apiKey={api} pageSize={pageSize} country="in" category="technology" /></Route>
        </Switch>
      </Router>
    </div>
  )

}

export default App;