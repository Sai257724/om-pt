import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    licenseNumber: "",
    specialization: "",
    shopName: "",
    shopAddress: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    if (form.role === "DOCTOR") {
      payload.licenseNumber = form.licenseNumber;
      payload.specialization = form.specialization;
    } else if (form.role === "PHARMACIST") {
      payload.shopName = form.shopName;
      payload.shopAddress = form.shopAddress;
    }

    console.log("Register Data:", payload);
    alert("Sign Up clicked — connect backend next!");
  };

  const isDoctor = form.role === "DOCTOR";
  const isPharmacist = form.role === "PHARMACIST";

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Create your account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="auth-input"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD WITH EYE ICON */}
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="auth-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <select
            name="role"
            className="auth-input"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Role</option>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="PHARMACIST">Pharmacist</option>
          </select>

          {/* DOCTOR FIELDS */}
          {isDoctor && (
            <>
              <input
                type="text"
                name="licenseNumber"
                placeholder="Medical License Number"
                className="auth-input"
                value={form.licenseNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                className="auth-input"
                value={form.specialization}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* PHARMACIST FIELDS */}
          {isPharmacist && (
            <>
              <input
                type="text"
                name="shopName"
                placeholder="Shop Name"
                className="auth-input"
                value={form.shopName}
                onChange={handleChange}
                required
              />

              <textarea
                name="shopAddress"
                placeholder="Shop Address"
                className="auth-input auth-textarea"
                value={form.shopAddress}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
