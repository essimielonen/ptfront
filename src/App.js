import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Traininglist from './components/Traininglist';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {

  return (
    <div className="App">

    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Personal training app
          </Typography> 
        </Toolbar>
      </AppBar>

       <Router> 
    <div>
    <Link to="/customerlist">All Customers</Link>{' '}
    <br></br> <br></br>
    <Link to="/traininglist">All Trainings</Link>{' '}

    <Route path="/customerlist/" component={Customerlist} />
    <Route path="/traininglist/" component={Traininglist} />
    </div>
      </Router> 

    </div>
  );
}

export default App;
