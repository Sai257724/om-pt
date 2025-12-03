import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div className="dashboard-wrapper">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Medication Tracker</h1>
          <div className="dashboard-user-info">
            Signed in as: {user.fullName} ({user.role})
          </div>
        </div>
        <div>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="dashboard-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="dashboard-content">
        {user.role === "PATIENT" && (
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Patient Dashboard</h2>
            <p className="dashboard-section-desc">
              View medications, reminders, and appointment details.
            </p>
          </div>
        )}

        {user.role === "DOCTOR" && (
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Doctor Dashboard</h2>
            <p className="dashboard-section-desc">
              Manage appointments, patient medical history, and prescriptions.
            </p>
          </div>
        )}

        {user.role === "PHARMACIST" && (
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Pharmacist Dashboard</h2>
            <p className="dashboard-section-desc">
              Manage dispensing queue and medicine stock alerts.
            </p>
          </div>
        )}

        {user.role === "ADMIN" && (
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Admin Dashboard</h2>
            <p className="dashboard-section-desc">
              View system statistics and manage user accounts.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
