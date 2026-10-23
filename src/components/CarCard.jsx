import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => (
  <article className="card" aria-label={`${car.brand} ${car.name}`}>
    <img src={car.image} alt={`${car.brand} ${car.name}`} loading="lazy" />
    <div className="title-row">
      <div>
        <h3 style={{ margin: '0 0 4px' }}>{car.brand}</h3>
        <p className="muted" style={{ margin: 0 }}>
          {car.name}
        </p>
      </div>
      <span className="price-chip">${car.price}/day</span>
    </div>
    <p className="muted" style={{ flex: 1 }}>{car.description}</p>
    <div className="tag-list" aria-label="Category and seating">
      <span className="badge">{car.category}</span>
      {car.specs?.seating && <span className="badge">Seats {car.specs.seating}</span>}
      {car.specs?.drivetrain && <span className="badge">{car.specs.drivetrain}</span>}
    </div>
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <Link className="button secondary" to={`/cars/${car.id}`}>
        View details
      </Link>
      <Link className="button" to="/rental">
        Reserve
      </Link>
    </div>
  </article>
);

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    specs: PropTypes.object
  }).isRequired
};

export default CarCard;
