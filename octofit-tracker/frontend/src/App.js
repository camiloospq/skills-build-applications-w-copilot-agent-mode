
// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './assets/octofitapp-small.png'; // adjust path as needed
import { Routes, Route, Link } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <>
      {/* Navigation Menu */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">          
          <Link to="/" className="navbar-brand fw-semibold d-flex align-items-center">
            <img src={logo} alt="Octofit Logo" className="octofit-logo" />
            Octofit Tracker
          </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/activities" className="nav-link">Activities</Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/teams" className="nav-link">Teams</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/workouts" className="nav-link">Workouts</Link>
            </li>
          </ul>
        </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="card shadow-sm">
                <div className="card-body">
                  <h1 className="display-6 mb-2">Welcome to Octofit Tracker</h1>
                  <p className="lead text-secondary mb-0">
                    Use the navigation to view activities, leaderboard, teams, users, and workouts.
                  </p>
                </div>
              </div>
            }
          />

          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />

          <Route
            path="*"
            element={
              <div className="alert alert-warning" role="alert">
                404 — Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
