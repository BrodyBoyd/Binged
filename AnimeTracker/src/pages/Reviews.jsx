import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate();
  
  const signOut = async () => {
      await authClient.signOut();
      navigate("/")
    }


    useEffect(() => {
          if (session){
          console.log(session.user.reviews)
          setReviews(session.user.reviews)
          }
        }, [])
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
  // useEffect(() => {
  //   getMostPopularAnime(100);
  // }, []);

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
              <Link to="/MyLists" className="nav-link activeLink">Lists</Link>
              <Link to="/Reviews" className="nav-link activeLink" style={{color: 'White'}}>Reviews</Link>
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
      <section className="allReviewsPage">
        <br/>
        <br/>
        <p className="listPageTitle">Your Reviews</p>
        <br/>
        <br/>
        <br/>
        <br/>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <div className="Lists">
            {reviews.map((show) => (
                <div key={show.id} className="show-item">
                  <img src={show.image || "/placeholder.svg"} alt={show.title} />
                  <div className="show-info">
                    <h3 className="show-title">{show.title}</h3>
                    <div className="show-rating">★ {show.rating}</div>
                    <div>Review: {show.review}</div>
                  </div>
                </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet!</p>
        )}


        
      </section>

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>

    </>
  );
}