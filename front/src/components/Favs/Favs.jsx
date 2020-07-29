import React, { Component } from 'react';
import axios from 'axios';
import getCookie from './../../getCookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/logo.png';
import Reviews from './../Banner/Reviews/Reviews';
import Modal from 'react-modal';

class Favs extends Component {
  state = { favourites: undefined };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie('jwt')}`
      }
    };

    axios
      .get(`https://rolocatii-back.herokuapp.com/api/v1/favourite?email=${getCookie('email')}`, config)
      .then(response => {
        this.setState({ favourites: response.data.data });
        console.log(this.state.favourites);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getLocation = locationId => {
    axios
      .get(`https://rolocatii-back.herokuapp.com/api/v1/places/place?place_id=${locationId}`)
      .then(response => {
        const location = response.data.data.result;
        this.setState({ location });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openModal = locationId => {
    this.getLocation(locationId);
    this.setState({ modal: true, locationIdd: locationId });
  };
  closeModal = () => this.setState({ modal: false });

  render() {
    let favClasses = 'fav-icon black';

    if (this.state.locationIdd) favClasses = 'fav-icon yellow';

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    let locations = '';

    if (this.state.favourites) {
      locations = this.state.favourites.map((location, index) => {
        let color;

        if (index % 2 === 0) color = 'red';
        else color = 'blue';

        return (
          <div className={`result ${color}`} onClick={() => this.openModal(location.id)}>
            <p className="location-name">{location.name}</p>
            <p className="rating">
              Rating Google: {location.rating} <FontAwesomeIcon icon={faStar} className="rating-icon" />
            </p>
            <p className="adress">{location.adress}</p>
          </div>
        );
      });
    }

    return (
      <div className="favs">
        <div className="section-title-container" id="favs">
          <img src={logo} alt="RoLocatii" />
          <h2 className="section-title">Locații favorite</h2>
        </div>
        <div className="results" style={{ height: '22em', overflow: 'scroll', overflowX: 'hidden' }}>
          {locations}
        </div>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.modal}
          onAfterOpen={this.openModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-content">
            <h3 className="location-name">
              {this.state.location ? this.state.location.name : ''}
              <FontAwesomeIcon icon={faStar} className={favClasses} onClick={this.addFav} />
            </h3>

            <p className="location-label">Adresă</p>
            <p className="location-answer">
              {this.state.location ? this.state.location.formatted_address : ''}
            </p>

            <p className="location-label">Telefon</p>
            <p className="location-answer">
              {this.state.location ? this.state.location.formatted_phone_number : ''}
            </p>
            <div className="location-photo-container">
              <img
                className="location-photo"
                src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                  this.state.location ? this.state.location.photos[0].photo_reference : ''
                }&key=AIzaSyA_Rb8VyZp258TtwgI1Fso2byw5TVj1AXI&maxwidth=1000&maxheight=1000`}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Reviews
                reviews={this.state.location ? this.state.location.reviews : ''}
                googleAverageRating={this.state.location ? this.state.location.rating : ''}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Favs;
