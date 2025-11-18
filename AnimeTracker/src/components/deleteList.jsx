"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authClient } from "../auth-client.js"


import "../pages/MyLists.jsx"

function DeleteList({ listName, onClose }) {

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
        }
      }, [])
  
  const handleClick = async (listName) => {
    console.log("Deleting list: " + listName)
    await fetch("/deleteList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ 
      listName: listName,
    }), 
  });
  console.log("Delete request sent")
  navigate('/')
  window.location.reload(true);
  }

  
  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Are you sure you want to delete?</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="deleteButtons">
          <button className="createListButton btn-primary" onClick={onClose}>Cancel</button>
          <button className="createListButton btn-danger" onClick={() => handleClick(listName)}>Confirm Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteList
