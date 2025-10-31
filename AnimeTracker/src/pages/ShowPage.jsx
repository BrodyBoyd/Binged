import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingModal from "../components/ratingModal";
import { useLocation } from "react-router-dom"
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";
import ListModal from "../components/addToList.jsx"



export default function  Discover() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [show, setShow] = useState(null)
  const navigate = useNavigate();

  const signOut = async () => {
      await authClient.signOut();
      navigate('/')
    }
    
  const openRatingModal = () => {
    setIsModalOpen(true)
  }
    
  const closeRatingModal = () => {
    setIsModalOpen(false)
  }


  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
  
  const location = useLocation()

  useEffect(() => {
    
  const currentShow = location.state?.show;
  setShow(currentShow);
  console.log(currentShow)
}, []);

  // const addToList = async () => {
    
  //   console.log("Watchlist add attempt")
  //   await fetch("/addToWatchlist", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify({ show }), // send the show object here
  // });
  // navigate('/')
  // window.location.reload(true);
  // }


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
                <Link to="/MyProfile">My Profile</Link>
                <Link to="/Reviews">Reviews</Link>
                <Link to="/MyLists">My Lists</Link>
                <a href="#">Followed Acounts</a>
                <a href="#" onClick={signOut}>Signout</a>
              </div>
            </div>)}
          </nav>
        </div>
      </header>
      <div className="ShowPage-Container">
        {show ? (
          <div className="show-details">
            <img src={show.image} alt={show.title} className="show-image" />
            <div classname="show-details-text">
              <div className="title-and-rating">
                <h2 className="show-title-showPage">{show.title_english ?? show.title}</h2>
                <strong className='showPage-Rating'>★<p > {show.rating}/10</p></strong>
              </div>
              <p><strong>Description:</strong> {show.description?.replace(/<p>/g, "")?.replace('</p>', "")?.replace('</b>', "")?.replace(/<b>/g, "")}</p>
              <p><strong>Type:</strong> {show.type}</p>
              <p><strong>Total Episodes:</strong> {show.episodes ?? 'N/A'}</p>
              <p><strong>Aring status:</strong> {show.status}</p>
              <p><strong>Genres:</strong> {show.genres}</p>
              <div className="show-actions">
                <button className="btn-primary show-button" onClick={() => openRatingModal(show)}>Add to List</button>
                <button className="btn-secondary show-button">Write a Review</button>
              </div>
            </div>
          </div>

        ) : (
          <p>No show data available.</p>
        )}
      </div>
      {isModalOpen && <ListModal show={show} onClose={closeRatingModal} />}

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
      

    </>
  );
}