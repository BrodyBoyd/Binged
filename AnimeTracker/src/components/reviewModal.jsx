"use client"
import { useNavigate } from "react-router-dom"

function ReviewModal({ review, onClose }) {
  const navigate = useNavigate()

    const handleDelete = async () => {
        let reviewId = review.reviewId 
        await fetch("/deleteReview", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ 
            reviewId: reviewId,
            }), 
        });
        navigate('/');
        window.location.reload(true);
    }
  return (
    <>
    <div className="modal active p-2">
      <div className=" ">
       <div>
            <div className="flex w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                <div className="review-modal-content overflow-hidden rounded-xl relative transform  transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
                    <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
                    <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info" data-lity="">
                        <div className="poster__info align-self-end w-full">
                            <div className="h-32"></div>
                            <div className="space-y-6 detail_info">
                                <div className="flex flex-col space-y-2 inner">
                                    <h3 className="text-2xl font-bold text-white" data-unsp-sanitized="clean">{review.title}</h3>
                                    <div className="mb-0 text-lg text-gray-400 hover:text-gray-50">{review.username}</div>
                                </div>
                                <div className="flex flex-row justify-between data">
                                    <div className="flex flex-col data">
                                        <div className="release">Rating:</div>
                                        <div className="text-sm text-gray-400">{review.rating}/10</div>
                                    </div>
                                </div>
                                <div className="flex flex-col overview">
                                    <div className="flex flex-col"></div>
                                    <div className="text-xs text-gray-400 mb-2">Review:</div>
                                    <p className="text-xs text-gray-100 mb-6">
                                        {review.review}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="absolute inset-0 transform w-full -translate-y-4 reviewImage" src={review.image} />
                </div>
            </div>
        </div>
        <button className="modal-close" onClick={onClose}>
            ×
        </button>
        <button className="text-md bg-red-500 rounded-2xl" onClick={handleDelete}>
            Delete Review
        </button>
      </div>
    </div>
</>
)};

export default ReviewModal;