import React, { Component } from 'react';
import DrawerToggleButton from './../SideDrawer/DrawerToggleButton';
import getCookie from './../../getCookie';
import './Toolbar.css';

class Toolbar extends Component {
  logout = () => {
    document.cookie = 'name=';
    document.cookie = 'email=';
    document.cookie = 'jwt=';
    window.location.href = `${window.location.origin}/`;
  };

  scrlTo = function (destination) {
    const element = document.getElementById(destination);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    let protectedLinks = '',
      authLinks = '';
    if (getCookie('jwt')) {
      protectedLinks = (
        <wrapper style={{ display: 'flex' }}>
          <li>
            <a onClick={() => this.scrlTo('favs')} style={{ cursor: 'pointer' }}>
              Locații favorite
            </a>
          </li>
          <li>
            <a href="/" onClick={this.logout}>
              Delogare
            </a>
          </li>
        </wrapper>
      );
    } else {
      authLinks = (
        <div className="toolbar-auth">
          <a href="/inregistrare">
            <button className="full">Cont nou</button>
          </a>

          <a href="/logare">
            <button className="empty">Intră în cont</button>
          </a>
        </div>
      );
    }

    return (
      <header className="toolbar">
        <nav className="toolbar-navigation">
          <div className="toolbar-toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>

          <div className="toolbar-navigation-items">
            <ul>
              <li>
                <a href="/">Acasă</a>
              </li>
              <li>
                <a onClick={() => this.scrlTo('top-location')} style={{ cursor: 'pointer' }}>
                  Locația lunii
                </a>
              </li>
              <li>
                <a onClick={() => this.scrlTo('about')} style={{ cursor: 'pointer' }}>
                  Despre
                </a>
              </li>

              <li>
                <a onClick={() => this.scrlTo('contact')} style={{ cursor: 'pointer' }}>
                  Contact
                </a>
              </li>
              {protectedLinks}
            </ul>
          </div>
          <div className="spacer" />

          {authLinks}
        </nav>
      </header>
    );
  }
}

export default Toolbar;
