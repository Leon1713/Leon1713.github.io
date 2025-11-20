import React, { useMemo, useState } from 'react';
import cars from '../data/cars.json';
import CarCard from '../components/CarCard.jsx';

const Home = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = useMemo(() => [...new Set(cars.map((car) => car.category))], []);

  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        const matchesCategory = category ? car.category === category : true;
        const matchesSearch = `${car.brand} ${car.name}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesPrice = maxPrice ? car.price <= Number(maxPrice) : true;
        return matchesCategory && matchesSearch && matchesPrice;
      }),
    [category, search, maxPrice]
  );

  return (
    <div className="app-shell">
      <section className="hero">
        <div className="hero-card">
          <h1>Luxury rentals reimagined</h1>
          <p>
            Browse our curated collection of exotics, supercars, and bespoke grand tourers. Book in three steps,
            get concierge delivery, and track every journey from a unified dashboard.
          </p>
          <div className="badge-row">
            <span className="badge">Concierge delivery</span>
            <span className="badge">Fully insured</span>
            <span className="badge">Live availability</span>
          </div>
          <div className="metrics">
            <div className="metric-card">
              <h3>Fleet utilization</h3>
              <strong>92% average</strong>
            </div>
            <div className="metric-card">
              <h3>Avg. delivery time</h3>
              <strong>24 minutes</strong>
            </div>
            <div className="metric-card">
              <h3>Customer rating</h3>
              <strong>4.9/5</strong>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <h2 style={{ marginTop: 0 }}>Seamless filtering</h2>
          <p className="muted">
            Use live filters to instantly surface the right car by category, drivetrain, or price ceiling. Every
            card shows real-time availability so you can book with confidence.
          </p>
          <div className="filter-row" style={{ marginBottom: '12px' }}>
            <input
              type="search"
              placeholder="Search brand or model"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search inventory"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Max price / day"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              aria-label="Maximum price"
              min="0"
            />
          </div>
          <div className="steps">
            {["Choose", "Verify", "Drive"].map((step, index) => (
              <div key={step} className="step">
                <h4>
                  {index + 1}. {step}
                </h4>
                <p>
                  {step === 'Choose' && 'Browse curated cars with transparent specs and pricing.'}
                  {step === 'Verify' && 'Upload license, select coverage, and schedule delivery in minutes.'}
                  {step === 'Drive' && 'Track mileage, extend bookings, and manage returns from one place.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-header">
        <div>
          <h2 className="section-title">Featured inventory</h2>
          <p className="section-subtitle">Dynamic pricing with full specs and multi-day discounts.</p>
        </div>
        <button className="button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
      </div>

      <div className="grid" role="list">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <section className="banner" style={{ marginTop: '28px' }}>
        <div>
          <h3 style={{ margin: '0 0 6px' }}>Everything in one place</h3>
          <p className="muted" style={{ margin: 0 }}>
            Customer and fleet dashboards give you live schedules, payments, and delivery statuses with zero extra tabs.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a className="button secondary" href="#dashboard">
            View dashboards
          </a>
          <a className="button" href="#rental">
            Start a booking
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
