import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
 

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Personal Trainer
            </Typography>

          </Toolbar>
        </AppBar>
        <BrowserRouter>
        <div>
          <Link to='/'>Home</Link>{' '}
          <Link to='/customers'>Customers</Link>{' '}
          <Link to='/trainings'>Trainings</Link>{' '}
          <Link to='/calendar'>Calendar</Link>{' '}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/customers' component={Customers} />
            <Route path='/trainings' component={Trainings} />
            <Route path='/calendar' component={Calendar} />
          </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;