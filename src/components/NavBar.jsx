import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="navbar">
    <Link to="/" className="brand" aria-label="Home">
      <span>LR</span>
      Luxury Rentals
    </Link>
    <nav className="nav-links">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/dashboard">Dashboards</NavLink>
      <NavLink to="/rental">Rental process</NavLink>
    </nav>
    <div className="nav-actions">
      <button className="button secondary" type="button">
        Support
      </button>
      <Link className="button" to="/rental">
        Start booking
      </Link>
    </div>
  </header>
);

export default NavBar;
