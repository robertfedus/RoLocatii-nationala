import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Banner from './components/Banner/Banner';
import About from './components/About/About';
import Favs from './components/Favs/Favs';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import getCookie from './getCookie';
import TopLocation from './components/TopLocation/TopLocation';

class MainPage extends Component {
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
      <div className="MainPage" style={{ height: '100%' }}>
        {backdrop}

        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />

        <main>
          <Banner />
          <TopLocation />
          <About />
          {getCookie('jwt') ? <Favs /> : ''}
          <Contact />
          <Footer />
        </main>
      </div>
    );
  }
}

export default MainPage;
