import React from 'react';
import './About.css';
import logo from './../../assets/logo.png';

const About = props => (
  <div className="about-section">
    <div className="section-title-container" id="about">
      <img src={logo} alt="RoLocatii" />
      <h2 className="section-title">Despre RoLocații</h2>
    </div>

    <p className="about">
      Ați pățit vreodată sa mergeți prin România în vacanță și să mancați la restaurantul pe care nici acum nu
      îl puteți uita? Ei bine, nu l-ați uitat. Dar probabil i-ați uitat numele. Sau locația exactă. Sau
      probabil chiar și numele localității în care se afla? Ei bine, RoLocații rezolvă această problemă. Și nu
      numai pentru restaurante! Toate locațiile din România vă vor fi salvate într-un singur loc: în contul
      dumneavoastră gratuit de pe RoLocații. Tot acolo veți putea găsi și locația perfectă pentru următoarea
      dată când nu veți ști unde să ieșiți în oraș. Iar asta datorită recenziilor plăcute lăsate pe Google sau
      pe RoLocații de către persoanele ce au vizitat locația.
    </p>
  </div>
);

export default About;
