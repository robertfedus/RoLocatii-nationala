import React from 'react';
import './AuthToolbar.css';

const AuthToolbar = props => {
  return (
    <div className="auth-toolbar">
      <a href={`${window.location.origin}/`} style={{ textDecoration: 'none' }}>
        <h1>RoLocații</h1>
      </a>
      <div className="spacer" />
      <div className="toolbar-auth">
        <a href={props.link}>
          <button className="empty">{props.message}</button>
        </a>
      </div>
    </div>
  );
};

export default AuthToolbar;
