import React, { Component } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="left section">
            <div className="footer-title">
              <h3>Navigație</h3>
            </div>

            <div className="footer-links footer-links-left">
              <a href={'/'}>Acasă</a>
              <a href="/#about">Despre</a>
              <a href="/">Locația lunii</a>
              <a href="/#contact">Contact</a>
              <a href="/#favs">Locații favorite</a>
            </div>
          </div>
          <div className="middle section">
            <div className="footer-title">
              <h3>Extern</h3>
            </div>

            <div className="footer-links footer-links-middle">
              <a href="/" className="facebook-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} size="2x" style={{ color: '#3b5998' }} className="icon" />
              </a>

              <a href="/" className="facebook-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#C13584' }} className="icon" />
              </a>

              <a href="/" className="facebook-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: '#FF0000' }} className="icon" />
              </a>
            </div>
          </div>
          <div className="right section">
            <div className="footer-title">
              <h3>Mai multe informații</h3>
            </div>
            <div className="footer-links footer-links-right">
              <a href="/sponsors">Politica de confidențialitate</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          Copyright &copy; 2020 RoLocații. All rights reserved. Website designed and developed by{' '}
          <a href="https://github.com/robertfedus" target="_blank" rel="noopener noreferrer">
            Robert Feduș
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
