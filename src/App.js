import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './Routing/Routes';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <AppRoutes />

      </div>
    </Router>
  );
}

export default App;
