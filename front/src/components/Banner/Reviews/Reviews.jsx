import React from 'react';
import './Reviews.css';
import { faSignature, faStar, faMapMarkedAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Reviews = props => {
  let reviews = '';
  if (props.reviews)
    reviews = props.reviews.map(review => (
      <div className="review">
        <div className="picture-name">
          <img src={review.profile_photo_url} className="review-profile-picture" />
          <p className="name">{review.author_name}</p>
          <p className="rating">{review.rating}</p>
          <FontAwesomeIcon icon={faStar} className="review-rating-icon" />
        </div>

        <div className="text">
          <p>{review.text}</p>
        </div>

        <div className="date">
          <span>{review.relative_time_description}</span>
        </div>

        <div className="spacer-container">
          <div className="spacer"></div>
        </div>
      </div>
    ));

  console.log(props.reviews);
  return (
    <div className="popup-reviews">
      <div className="top">
        <div className="left">
          Recenzii ({props.googleAverageRating}
          <FontAwesomeIcon icon={faStar} className="review-rating-icon" />)
        </div>
        <div className="right">
          <p>Google</p> <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className="bottom">{reviews}</div>
    </div>
  );
};

export default Reviews;
