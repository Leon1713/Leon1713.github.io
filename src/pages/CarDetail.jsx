import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cars from '../data/cars.json';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <div className="app-shell">
        <p>Car not found.</p>
        <button className="button" type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="section-header">
        <div>
          <h1 className="section-title">{car.brand} {car.name}</h1>
          <p className="section-subtitle">${car.price}/day · {car.category}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="button secondary" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <Link className="button" to="/rental">
            Book now
          </Link>
        </div>
      </div>

      <div className="detail-layout">
        <article className="card">
          <img src={car.image} alt={`${car.brand} ${car.name}`} />
          <p className="muted">{car.longdescription}</p>
          <div className="tag-list">
            {car.features?.map((feature) => (
              <span className="badge" key={feature}>
                {feature}
              </span>
            ))}
          </div>
        </article>

        <article className="card">
          <h3 style={{ margin: '0 0 12px' }}>Core specifications</h3>
          <div className="spec-grid">
            {Object.entries(car.specs || {}).map(([spec, value]) => (
              <div key={spec} className="spec">
                <p className="muted" style={{ margin: '0 0 4px', textTransform: 'capitalize' }}>
                  {spec}
                </p>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

      {car['features-description']?.length > 0 && (
        <div className="grid" style={{ marginTop: '16px' }}>
          {car['features-description'].map((line, index) => (
            <article key={line} className="card">
              <h4 style={{ margin: '0 0 6px' }}>Feature {index + 1}</h4>
              <p className="muted" style={{ margin: 0 }}>{line}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarDetail;
