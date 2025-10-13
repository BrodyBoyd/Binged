"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/ShowPage.jsx"

function RatingModal({ show, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating > 0) {
      onSubmit({
        ...show,
        userRating: rating,
        review: review,
        dateRated: new Date().toISOString(),
      })
    }
  }
  const handleGoToShowPage = () => {
    onClose()
    if (show?.id) {
      navigate(`/show`, { state: { show } })
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
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "active" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your review (optional)..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button type="button" className="btn-secondary" onClick={handleGoToShowPage}>
                Go To Show Page
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={rating === 0}>
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
