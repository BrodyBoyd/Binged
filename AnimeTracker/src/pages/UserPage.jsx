import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingModal from "../components/ratingModal";
import { useLocation } from "react-router-dom"
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar.jsx'


export default function  MyProfile() {
  const [lists, setLists] = useState([])
  const [instaLink, setInstaLink] = useState("")
  const [reviews, setReviews] = useState([])

  
  
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut();
    navigate("/")
  }

  const handleClick = (list) => {
    console.log(list)
    const dataToSend = { list };
    navigate('/List', { state: { data: dataToSend } });
  };
  
  const { 
          data: session, 
          isPending, //loading state
          error, //error object
          refetch //refetch the session
      } = authClient.useSession()
  useEffect(() => {
    if (session && session.user) {
      console.log(session.user.lists)
      console.log("hey")
      setLists(session.user.lists || [])
      setReviews(session.user.reviews || [])
      setInstaLink(session.user.instagramAccountLink || "")
      if (session.user.profilePic) {
        console.log("has profile pic")
        console.log('profilePic value:', session.user.profilePic)
      }
    }
  }, [session])
  return (
    <>
      <Navbar />
      
      <div className="">
        {/* {session ? (
          <div className="profile-details">
            <div className="topProfileItems">
              
              <img src={session.user.profilePic} alt={session.user.username} className="profileImage" />
              <h2 className="profileUsername">{session.user.username}</h2>
              {instaLink != "" ? (        
                <a href={instaLink} target="_blank" class="fa fa-instagram"></a>)
              : (<div></div>)}
                <button>Edit Account</button>
            </div>
            
            <div classname="show-details-text">
              <div className="title-and-rating">
              </div>
            </div>
            <div className="profile-boxes">
              <div className="profile-lists">
                <h3 className="profile-list-title"> My Lists</h3>
                  <div className="Lists">
                    {Array.isArray(lists) && lists.length > 0 ? (
                      <div className="search-results">
                        {lists.map((list) => (
                          <div key={list.id} className="show-item" onClick={() => {handleClick(list); }}>
                            <h3>{list.name}</h3>
                          </div>
                        ))}
                      </div>
                    ) : (<p>Not Signed in</p>)}
                  </div>
              </div>
            <div className="profile-favorites">
                <h3 className="profile-list-title"> My favorites</h3>
            </div>
          </div>
        </div>
        ) : (
          <p>No User available.</p>
        )} */}

        {session ? (
          <main class="profile-page">
  
  <section class="relative py-16">
    <div class="container mx-auto px-4 ">
      <div class="relative flex flex-col min-w-0 wrap-break-word bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div class="px-6">
          <div class="flex flex-wrap justify-center profile-top-section">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">
                {session?.user?.profilePic ? (
                  <div>
                    <img
                      src={session.user.profilePic}
                      alt={session.user.username}
                      className="shadow-xl rounded-full object-cover border-none -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      style={{ position: 'relative', width: '128px', height: '128px' }}
                      onError={(e) => { console.error('Profile image failed to load', e); e.target.style.display = 'none'; }}
                    />
                    {/* <p className="text-sm text-gray-500 break-all mt-2">{session.user.profilePic}</p> */}
                  </div>
                ) : (
                  <div className="shadow-xl rounded-full h-32 w-32 bg-gray-200 absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px flex items-center justify-center">No image</div>
                )}
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div class="py-6 px-3 mt-32 sm:mt-0">
                <button class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-2 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                  Follow
                </button>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-1 ">
              <div class="flex justify-around py-4 lg:pt-4 pt-8">
                <div class="mr-4 p-3 text-center mx-3">
                  <span class="text-xl font-bold block uppercase tracking-wide text-gray-600">{session.user.reviews.length}</span><span class="text-sm text-gray-400">Reviews</span>
                </div>
                <div class="mr-4 p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-gray-600">{session.user.lists.length}</span><span class="text-sm text-gray-400 mx-2">Lists</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-12 ">
            <h3 class="text-4xl font-semibold leading-normal text-gray-700 mb-2">
              {session.user.username}
            </h3>
            <div class="mb-2 text-gray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-gray-400"></i>Favorite Show - *show*
            </div>
            {instaLink && (
            <div class="mb-2 text-gray-600">
              <a href={instaLink} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram mr-2 text-lg text-gray-400"></i>Instagram
              </a>
            </div>
            )}
          </div>
          <div class="mt-10 py-10 border-t border-gray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <h3 className="profile-list-title text-gray-400"> My Lists</h3>
                  <div className="Lists">
                    {Array.isArray(lists) && lists.length > 0 ? (
                      <div className="search-results">
                        {lists.map((list) => (
                          <div key={list.id} className="show-item" onClick={() => {handleClick(list); }}>
                            <h3>{list.name}</h3>
                          </div>
                        ))}
                      </div>
                    ) : (<p>Not Signed in</p>)}
                  </div>
              </div>
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-gray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <h3 className="profile-list-title text-gray-400"> My Reviews</h3>
                  <div className="Lists">
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                      <div className="search-results">
                        {reviews.map((review) => (
                          <div>
            <div className="flex bg-white shadow-md rounded-lg overflow-hidden mx-auto ">
                <div className="overflow-hidden rounded-xl relative transform  transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
                    <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-linear-to-t from-black via-gray-900 to-transparent"></div>
                    <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info" data-lity="">
                        <div className="poster__info align-self-end w-full">
                            <div className="h-32"></div>
                            <div className="space-y-6 detail_info">
                                <div className="flex flex-col space-y-2 inner">
                                    <h3 className="text-2xl font-bold text-white" data-unsp-sanitized="clean">{review.title}</h3>
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
                        ))}
                      </div>
                    ) : (<p>Not Signed in</p>)}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
        ) : (
          <p>No User available.</p>
        )}
      </div>

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
      

    </>
  );
}