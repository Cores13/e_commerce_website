import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import {Navbar} from './components/navbar/Navbar'
import {MainPages} from './components/mainPages/Pages'
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Navbar />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
