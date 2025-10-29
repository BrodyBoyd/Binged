import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingModal from "../components/ratingModal";
import { useLocation } from "react-router-dom"
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";


export default function  MyProfile() {

  const location = useLocation()
  const show = location.state?.show
  console.log(show);
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut();
    navigate("/")
  }
  const { 
          data: session, 
          isPending, //loading state
          error, //error object
          refetch //refetch the session
      } = authClient.useSession()

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
            {!session ? ( <div className="auth-buttons">
              <Link to ="/signin" className="btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </div>  ) : (<div class="dropdown">
              <button class="dropbtn">{session.user.username} 
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                <Link href="/MyProfile">My Profile</Link>
                <Link to="/Reviews">Reviews</Link>
                <Link to="/MyLists">My Lists</Link>
                <a href="#">Followed Acounts</a>
                <a href="#" onClick={signOut}>Signout</a>
              </div>
            </div>)}
          </nav>
        </div>
      </header>
      <div className="Profile-Container">
        {session ? (
          <div className="profile-details">
            <div className="topProfileItems">
              <img src={session.user.profilePic} alt={session.user.username} className="profileImage" />
              <h2 className="profileUsername">{session.user.username}</h2>
            </div>
            <div classname="show-details-text">
              <div className="title-and-rating">
              </div>
            </div>
          </div>
        ) : (
          <p>No User available.</p>
        )}
      </div>
      

    </>
  );
}