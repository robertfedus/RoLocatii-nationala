import React, { Component } from 'react';
import axios from 'axios';
import './Contact.css';
import logo from './../../assets/logo.png';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      country: '',
      message: ''
    };
  }

  sendState = () => {
    let param = false;

    if (this.state.loggedIn) {
      param = true;
    }
    return this.props.parentCallback(param);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    const reqBody = { ...this.state };
    axios
      .post('', reqBody)
      .then(response => {
        this.response = { ...response };
        alert(this.response.data.message);
        window.location.reload();
      })
      .catch(e => {
        alert('Error sending the message');
      });
  };

  render() {
    const { name, email, country, message } = this.state;

    return (
      <div className="contact-section" id="contact" style={{ marginTop: '2em' }}>
        <div className="section-title-container" id="favs">
          <img src={logo} alt="RoLocatii" />
          <h2 className="section-title">Contact</h2>
        </div>
        <br />
        <div className="p-wrapper">
          <p className="header__p">
            Ai vreo întrebare?&nbsp;
            <br className="text-break1" />
            Ai de raportat o eroare?&nbsp;
            <br className="text-break2" />
            Atunci scrie-ne un mesaj!&nbsp;
          </p>
        </div>
        <div className="form-wrapper">
          <form className="contact-form" onSubmit={this.submitHandler}>
            <label>
              Nume complet <span>*</span>
            </label>
            <input type="text" name="name" value={name} onChange={this.changeHandler} required />
            <br />
            <label>
              E-mail <span>*</span>
            </label>
            <input
              type="text"
              // placeholder="Email"
              name="email"
              value={email}
              onChange={this.changeHandler}
              required
            />
            <br />
            <label>
              Mesaj <span>*</span>
            </label>
            <textarea
              type="text"
              // placeholder="Message"
              name="message"
              value={message}
              onChange={this.changeHandler}
              className="message"
              required
            />
            <br />
            <button type="submit" className="submit-button">
              Trimite
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
