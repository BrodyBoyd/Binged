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
      if (session){
      console.log(session.user.lists)
      setLists(session.user.lists)
      setInstaLink(session.user.instagramAccountLink)
      }
    }, [])
  return (
    <>
      <Navbar />
      
      <div className="Profile-Container">
        {session ? (
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