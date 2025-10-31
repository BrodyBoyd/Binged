"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authClient } from "../auth-client.js"


import "../pages/ShowPage.jsx"

function ListModal({ show, onClose }) {

  const [lists, setLists] = useState([]);
  const navigate = useNavigate()

  const { 
          data: session, 
          isPending, //loading state
          error, //error object
          refetch //refetch the session
      } = authClient.useSession()

  useEffect(() => {
        if (session){
        console.log(`signed in as ${session.user.username}`)
        setLists(session.user.lists)
        }
      }, [])
  
  const handleClick = async (list) => {
    await fetch("/addToList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ 
      listName: list.name,
      show: {show}             
    }), 
  });
  navigate('/')
  window.location.reload(true);
  }

  
  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add {show?.title} To List</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {Array.isArray(lists) && lists.length > 0 ? (
          <div className="search-results">
            {lists.map((list) => (
              <div key={list.id} className="show-item"  onClick={() => {handleClick(list);}}>
                <h3 className="List-modal-title">{list.name}</h3>
              </div>
            ))}
          </div>
        ) : (<p>Not Signed in</p>)}
        </div>
      </div>
    </div>
  )
}

export default ListModal
