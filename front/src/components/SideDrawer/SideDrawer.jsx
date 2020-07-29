import React from 'react';
import './SideDrawer.css';
import getCookie from './../../getCookie';

const SideDrawer = props => {
  let drawerClasses = 'side-drawer';

  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  const logout = () => {
    document.cookie = 'name=';
    document.cookie = 'email=';
    document.cookie = 'jwt=';
    window.location.href = `${window.location.origin}/`;
  };
  let protectedLinks = '',
    authLinks = '';
  if (getCookie('jwt')) {
    protectedLinks = (
      <wrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <li>
          <a href="#favs">Locații favorite</a>
        </li>
        <li>
          <a href="/" onClick={logout}>
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
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Acasă</a>
        </li>
        <li>
          <a href="/#top-location">Locația lunii</a>
        </li>
        <li>
          <a href="/#about">Despre</a>
        </li>

        <li>
          <a href="/#contact">Contact</a>
        </li>
        {protectedLinks}
      </ul>
    </nav>
  );
};

export default SideDrawer;
