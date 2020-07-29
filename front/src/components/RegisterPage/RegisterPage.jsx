import React, { useState } from 'react';
import AuthToolbar from './../AuthToolbar/AuthToolbar';
import './RegisterPage.css';
import axios from 'axios';
import validator from 'email-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faAsterisk, faLock } from '@fortawesome/free-solid-svg-icons';
import getCookie from './../../getCookie';

const RegisterPage = props => {
  if (getCookie('jwt')) window.location.href = `${window.location.origin}/`;
  const [errorMessage, setMessage] = useState(null);

  const register = event => {
    event.preventDefault();

    if (!event.target.name.value) setMessage('Numele este obligatoriu.');
    else if (!event.target.email.value) setMessage('Email-ul este obligatoriu.');
    else if (!validator.validate(event.target.email.value)) setMessage('Email-ul este invalid.');
    else if (!event.target.password.value) setMessage('Parola este obligatorie.');
    else if (!event.target.confirmPassword.value) setMessage('Confirmarea parolei este obligatorie.');
    else if (event.target.name.value.length < 3) setMessage('Numele trebuie sa contina minim 3 caractere');
    else if (event.target.password.value.length < 6)
      setMessage('Parola trebuie sa contina minim 6 caractere.');
    else if (event.target.password.value !== event.target.confirmPassword.value)
      setMessage('Cele doua parole nu coincid.');
    else {
      const body = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        confirmPassword: event.target.confirmPassword.value
      };

      axios
        .post('https://rolocatii-back.herokuapp.com/api/v1/auth/register', body)
        .then(response => {
          const user = response.data.data.user;
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
      <AuthToolbar message="Ai deja cont?" link={`${window.location.origin}/logare`} />

      <form className="auth-form" onSubmit={register}>
        <h2>Creează un cont nou pe platforma noastră</h2>

        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="auth-icon" />
          <input type="text" placeholder="Nume" name="name" />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
          <input type="text" placeholder="E-mail" name="email" />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faAsterisk} className="auth-icon" />
          <input type="password" placeholder="Parola" name="password" />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="auth-icon" />
          <input type="password" placeholder="Confirmă parola" name="confirmPassword" />
        </div>

        <span className="error-message">{errorMessage}</span>
        <input type="submit" value="Confirmă" name="submit" />
      </form>
    </div>
  );
};
export default RegisterPage;
