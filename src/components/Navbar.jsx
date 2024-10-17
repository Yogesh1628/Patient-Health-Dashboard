import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Patient Dashboard</h1>
      <div className="links">
        <Link to="/">Patient List</Link>
        <Link to="/add-patient">Add Patient</Link>
        <Link to="/authorization-form">Submit Authorization</Link>
        <Link to="/search-patient">Search</Link>  
      </div>
    </nav>
  );
};

export default Navbar;
