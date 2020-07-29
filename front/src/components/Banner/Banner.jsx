import React, { Component } from 'react';
import Title from './Title/Title';
import SVG from './Map/SVG/SVG';
import axios from 'axios';
import judete from './../../judete.json';
import location_types from './../../location_types.json';
import logo from './../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Reviews from './Reviews/Reviews';
import getCookie from './../../getCookie';
import superagent from 'superagent';

import './Banner.css';

class Banner extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    locations: undefined,
    showLocations: false,
    nextPage: undefined,
    modal: false,
    location: undefined,
    locationPhotoRef: undefined,
    locationIdd: undefined
  };

  getLocations(path) {
    const judet = judete[judete.findIndex(judet => judet.id === path)];
    this.setState({ judet });
    const radius = '50000';
    // this.setState({ localitate: judet.resedinta });
    const locationType = document.getElementById('select-location-type').value;

    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/places?radius=${radius}&location=${judet.coord}&resedinta=${judet.resedinta}&type=${locationType}`
      )
      .then(response => {
        if (response.data.data.next_page_token)
          this.setState({
            nextPage: response.data.data.next_page_token
          });

        this.setState({
          locations: response.data.data.results,
          showLocations: true
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  getLocationsByPage = () => {
    const judet = this.state.judet;
    const radius = '50000';
    this.setState({ localitate: judet.resedinta });
    const locationType = document.getElementById('select-location-type').value;
    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/places?pagetoken=${this.state.nextPage}&radius=${radius}&location=${judet.coord}&resedinta=${judet.resedinta}&type=${locationType}`
      )
      .then(response => {
        if (response.data.data.next_page_token)
          this.setState({
            nextPage: response.data.data.next_page_token
          });

        this.setState({
          locations: response.data.data.results
        });
        this.setState({ showLocations: true });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  clickedPath = event => {
    this.getLocations(event.target.id);
  };

  changedLocationType = event => {
    let select = event.target;
    this.setState({
      locationTypeRo: select[select.selectedIndex].text,
      showLocations: false
    });
  };

  getLocation = locationId => {
    axios
      .get(`https://rolocatii-back.herokuapp.com/api/v1/places/place?place_id=${locationId}`)
      .then(response => {
        const location = response.data.data.result;
        this.setState({ location, locationIdd: locationId });
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

  addFav = () => {
    if (getCookie('jwt')) {
      const body = {
        email: getCookie('email'),
        favourite: {
          id: this.state.locationIdd,
          name: this.state.location.name,
          adress: this.state.location.formatted_address,
          rating: this.state.location.rating
        }
      };

      console.log(this.state.locationIdd);
      const jwt = getCookie('jwt');
      superagent
        .post('https://rolocatii-back.herokuapp.com/api/v1/favourite')
        .send(body)
        .set('accept', 'json')
        .set('Authorization', `Bearer ${jwt}`)
        .end((err, res) => {
          console.log(res);
        });
    } else console.log('Trebuie să fii autentificat pentru a face asta!');
  };

  render() {
    let favClasses = 'fav-icon yellow';

    // if (this.state.locationIdd) favClasses = 'fav-icon yellow';

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

    let results;

    if (this.state.showLocations) {
      results = (
        <div>
          <div className="section-title-container" id="#results">
            <img src={logo} alt="RoLocatii" />
            <h2 className="section-title">Rezultatele căutarii</h2>
          </div>
          <div className="results">
            {this.state.locations.map((location, index) => {
              let color;

              if (index % 2 === 0) color = 'red';
              else color = 'blue';

              return (
                <div className={`result ${color}`} onClick={() => this.openModal(location.place_id)}>
                  <p className="location-name">{location.name}</p>
                  <p className="rating">
                    Rating Google: {location.rating} <FontAwesomeIcon icon={faStar} className="rating-icon" />
                  </p>
                  <p className="adress">{location.vicinity}</p>
                </div>
              );
            })}

            <span className="next-page" onClick={this.getLocationsByPage}>
              Pagina următoare
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="banner">
        <div className="top">
          <Title />
          <div className="map">
            <SVG clickedPath={this.clickedPath} />
            <select name="location-type" id="select-location-type" onChange={this.changedLocationType}>
              <option value="null">Toate locatiile</option>
              {location_types.map(location => (
                <option value={location.value}>{location.ro}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bottom">{results}</div>
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

export default Banner;
