import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingModal from "../components/ratingModal";
import { useLocation } from "react-router-dom"

export default function  Discover() {

  const location = useLocation()
  const show = location.state?.show
  console.log(show);

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
              <Link to="/Reviews" className="nav-link">Reviews</Link>
            </div>
            <div className="auth-buttons">
              <Link to ="/signin" className="btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-primary">Signup</Link>
            </div>
          </nav>
        </div>
      </header>
      <br></br>
      <br/>
      <div className="ShowPage-Container">
        {show ? (
          <div className="show-details">
            <img src={show.image} alt={show.title} className="show-image" />
            <div classname="show-details-text">
              <div className="title-and-rating">
                <h2 className="show-title-showPage">{show.title}</h2>
                <strong className='showPage-Rating'>★<p > {show.rating}/10</p></strong>
              </div>
              <p><strong>Type:</strong> {show.type}</p>
              <p><strong>Total Episodes:</strong> {show.episodes ?? 'N/A'}</p>
              <p><strong>Aring status:</strong> {show.status}</p>
              <p><strong>Genres:</strong> {show.genres}</p>
              <p><strong>Description:</strong> {show.description.replace(/<p>/g, "").replace('</p>', "").replace('</b>', "").replace(/<b>/g, "")}</p>
              <div className="show-actions">
                <button className="btn-primary show-button">Add to Watchlist</button>
                <button className="btn-secondary show-button">Write a Review</button>
              </div>
            </div>
          </div>
        ) : (
          <p>No show data available.</p>
        )}
      </div>
      

    </>
  );
}