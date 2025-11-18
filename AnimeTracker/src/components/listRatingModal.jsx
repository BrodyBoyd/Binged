"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/ShowPage.jsx"
import { authClient } from "../auth-client.js"


function RatingModal({ show, onClose }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const navigate = useNavigate()

  const { 
            data: session, 
            isPending, //loading state
            error, //error object
            refetch //refetch the session
        } = authClient.useSession()

  const submitRating = async (e) => {
    e.preventDefault()
    await fetch("/createReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ 
      showId: show.id,
      reviewText: review,
      rating: rating,
      show: show
    }), 
  });
  navigate('/')
  window.location.reload(true);
  }

  const handleGoToShowPage = () => {
    onClose()
    if (show?.id) {
      navigate("/show", { state: { show } })
    } else {
      navigate("/show", { state: { show } })
    }
  }

  const handleStarClick = (starRating) => {
    setRating(starRating)
  }

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Rate {show?.title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <span
                key={star}
                className={`scale-y-50 sm:scale-100 star ${star <= rating ? "active" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <form onSubmit={submitRating}>
            <textarea
              placeholder="Write your review (optional)..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button type="button" className="btn-secondary ratingModalButton" onClick={handleGoToShowPage}>
                Go To Show Page
              </button>
              <button type="button" className="btn-secondary ratingModalButton" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary ratingModalButton" disabled={rating === 0}>
                Submit Rating
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
