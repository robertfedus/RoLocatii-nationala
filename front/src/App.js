import React, { Component } from 'react';
import './App.css';

import Backdrop from './components/Backdrop/Backdrop';
import Banner from './components/Banner/Banner';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';

import MainPage from './MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="App">
          <div>
            <Switch>
              <Route path="/" component={MainPage} exact />
              <Route path="/inregistrare" component={RegisterPage} exact />
              <Route path="/logare" component={LoginPage} exact />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
