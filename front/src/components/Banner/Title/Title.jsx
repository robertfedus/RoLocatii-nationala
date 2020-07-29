import React from 'react';

import './Title.css';

const Title = props => {
  return (
    <div className="title">
      <h1>RoLocații</h1>
      <p className="description">
        Arhiva locațiilor României.
        <br />
        Începe prin a da click pe un județ.
      </p>

      <div className="buttons">
        <a href="inregistrare">
          <button className="full">Începe acum</button>
        </a>
        <a href="#about">
          <button className="empty">Mai multe</button>
        </a>
      </div>
    </div>
  );
};

export default Title;
