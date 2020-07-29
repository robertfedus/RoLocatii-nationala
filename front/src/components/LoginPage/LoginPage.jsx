import React, { useState } from 'react';
import AuthToolbar from './../AuthToolbar/AuthToolbar';
import './../RegisterPage/RegisterPage.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import getCookie from './../../getCookie';

const LoginPage = props => {
  if (getCookie('jwt')) window.location.href = `${window.location.origin}/`;
  const [errorMessage, setMessage] = useState(null);

  const register = event => {
    event.preventDefault();

    if (!event.target.email.value) setMessage('Email-ul este obligatoriu.');
    else if (!event.target.password.value) setMessage('Parola este obligatorie.');
    else {
      const body = {
        email: event.target.email.value,
        password: event.target.password.value
      };
      let user;
      axios
        .post('https://rolocatii-back.herokuapp.com/api/v1/auth/login', body)
        .then(response => {
          user = response.data.data.user;
          document.cookie = `name=${user.name}`;
          document.cookie = `email=${user.email}`;
          document.cookie = `jwt=${response.data.data.token}`;
          window.location.href = `${window.location.origin}/`;
        })
        .catch(error => {
          console.log(error.response.data);
          setMessage(error.response.data.message);
        });
    }
  };

  return (
    <div className="register-page">
      <AuthToolbar message="Nu ai cont?" link={`${window.location.origin}/inregistrare`} />

      <form className="auth-form" onSubmit={register}>
        <h2>Intră în contul tău</h2>

        <div className="input-container">
          <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
          <input type="text" placeholder="E-mail" name="email" />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faAsterisk} className="auth-icon" />
          <input type="password" placeholder="Parola" name="password" />
        </div>

        <span className="error-message">{errorMessage}</span>
        <input type="submit" value="Confirmă" name="submit" />
      </form>
    </div>
  );
};
export default LoginPage;
