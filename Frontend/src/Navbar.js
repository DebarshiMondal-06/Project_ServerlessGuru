import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar-section">
      <nav className="navbar shadow navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">watchGuru.com</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;