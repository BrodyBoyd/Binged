import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewModal from "../components/reviewModal.jsx";
import Navbar from '../components/navbar.jsx'


export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  
  const navigate = useNavigate();

  const openRatingModal = (show) => {
    setCurrentShow(show);
    setIsModalOpen(true);
  };

const closeRatingModal = () => {
    setIsModalOpen(false);
  };

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
      <Navbar />

      <section className="allReviewsPage">
        <br/>
        <br/>
        <p className="listPageTitle">Your Reviews</p>
        <br/>
        <br/>
        <br/>
        <br/>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <div className="list-results">
            {reviews.map((show) => (
                <div key={show.id} className="review-item" onClick={() => openRatingModal(show)}>
                  <img className='flex justify-center review-image' src={show.image || "/placeholder.svg"} alt={show.title} />
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


        {isModalOpen && <ReviewModal review={currentShow} onClose={closeRatingModal} />}
      </section>

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>

    </>
  );
}