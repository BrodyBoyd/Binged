import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {

  
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
            <a href="#" className="nav-link">
              Lists
            </a>
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
          <h1 className="hero-title">Sign Up!</h1>
          <p className="hero-subtitle">
            Join thousands of anime enthusiasts in rating and discovering your next binge-worthy series. Create lists,
            write reviews, and never forget what you've watched.
          </p>
          <div className="Signup-form">
            <form className="">
              <div class="form-group">
                  <span>Username</span>
                  <input class="form-field" type="text" placeholder="Username"></input>
              </div>
              <br/>
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
              <div class="form-group">
                  <input class="form-field" type="password" placeholder="Repeat Password"></input>
                  <span>Repeat Password</span>
              </div>
              <br/>
              <div className="signup-buttons">
                <button type="submit" className="btn-primary btn-large">Sign Up</button>
                <Link to="/signin" className="btn-secondary btn-large">Don't have an Account? Sign in!</Link>
              </div>
            </form>
        </div>
      </div>
      </div>
    </section>
    </>
  );
}