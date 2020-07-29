import React, { Component } from 'react';
import './TopLocation.css';
import logo from './../../assets/logo.png';
import axios from 'axios';

class TopLocation extends Component {
  state = {
    location: undefined,
    count: undefined
  };

  componentDidMount = () => {
    axios
      .get(`https://rolocatii-back.herokuapp.com/api/v1/favourite/top`)
      .then(response => {
        this.getLocation(response.data.data.topLocation[0]._id);
        this.setState({ count: response.data.data.topLocation[0].count });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getLocation = locationId => {
    axios
      .get(`https://rolocatii-back.herokuapp.com/api/v1/places/place?place_id=${locationId}`)
      .then(response => {
        const location = response.data.data.result;
        this.setState({ location });
        console.log(response.data.data.result.photos[0].photo_reference);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    let locationDetails = '';
    if (this.state.location) {
      locationDetails = (
        <div className="location-details">
          <div className="title">
            <h3>{this.state.location.name}</h3>
          </div>
          <div className="photo-container">
            <img
              className="location-photo"
              src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                this.state.location ? this.state.location.photos[0].photo_reference : ''
              }&key=AIzaSyA_Rb8VyZp258TtwgI1Fso2byw5TVj1AXI&maxwidth=1000&maxheight=1000`}
            />
          </div>

          <span className="q">Adresă</span>
          <span className="a">{this.state.location.vicinity}</span>
          <span className="q">Telefon</span>
          <span className="a">{this.state.location.formatted_phone_number}</span>
        </div>
      );
    }

    return (
      <div className="top-location">
        <div className="section-title-container" id="top-location">
          <img src={logo} alt="RoLocatii" />
          <h2 className="section-title">Locația lunii</h2>
        </div>

        <div className="description">
          <p>
            Locația lunii reprezintă locația preferată a utilizatorilor RoLocații în luna curentă. În luna
            aceasta <span style={{ color: 'var(--red)' }}>{this.state.count ? this.state.count : '0'}</span>{' '}
            utilizatori au trecut locația în lista lor de favorite.
          </p>
        </div>
        {locationDetails}
      </div>
    );
  }
}

export default TopLocation;
