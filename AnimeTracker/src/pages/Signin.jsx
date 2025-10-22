import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signin() {

  
  return (
    <>
      <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <h1>Binged</h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/discover" className="nav-link">Discover</Link>
            <Link to="/MyLists" className="nav-link">Lists</Link>
            <a href="#" className="nav-link">
              Reviews
            </a>
          </div>
          <div className="auth-buttons">
            
          </div>
        </nav>
      </div>
    </header>

    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Sign In!</h1>
          <div className="Signup-form">
            <form className="">
              <div class="form-group">
                  <input class="form-field" type="email" placeholder="Email"></input>
                  <span>Email</span>
              </div>
              <br/>
              <div class="form-group">
                  <span>Password</span>
                  <input class="form-field" type="password" placeholder="Password"></input>
              </div>
              <br/>
              <br/>
              <div className="signup-buttons">
                <button type="submit" className="btn-primary btn-large">Sign in</button>
                <Link to="/signup" className="btn-secondary btn-large">Don't have an Account? Sign Up!</Link>
              </div>
            </form>
        </div>
      </div>
      </div>
    </section>
    </>
  );
}