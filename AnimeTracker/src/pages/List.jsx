import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { reverse } from "dns";
import DeleteList from "../components/deleteList.jsx";

export default function Lists() {

  const [lists, setLists] = useState([])
  const [shows, setShows] = useState([])
  const [listName, setListName] = useState('')
  const [receivedData, setRecievedData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate();

  const openRatingModal = () => {
    setIsModalOpen(true)
  }
    
  const closeRatingModal = () => {
    setIsModalOpen(false)
  }
  const signOut = async () => {
    await authClient.signOut();
    navigate("/")
  }
  const location = useLocation();
   

  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    useEffect(() => {
      if (session){
      console.log(`signed in as ${session.user.username}`)
      const receivedData = location.state?.data;
      console.log(receivedData)
      const shows = receivedData.list.shows
      const listName = receivedData.list.name
      setRecievedData(receivedData)
      setListName(listName)
      setShows(shows)
      }
    }, [])


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
              <Link to="/MyLists" className="nav-link activeLink" style={{color: 'White'}}>Lists</Link>
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
      <section className="allListsPage">
        <br/>
        <br/>
        <p className="listPageTitle">{listName}</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="Lists">
          {receivedData ? (
          <div className="search-results">
            {shows.map((show) => (
              <div className="search-results">
                <div key={show.id} className="show-item">
                  <img src={show.image || "/placeholder.svg"} alt={show.title} />
                  <div className="show-info">
                    <h3 className="show-title">{show.title}</h3>
                    <div className="show-rating">★ {show.rating}</div>
                    {show.episodes != null && ( <div className="show-episodes">{show.episodes} episodes</div> )}
                  </div>
                </div>
                </div>
              ))}
          </div>
        ) : (<p>No Shows in List</p>)}

        </div>
        <button onClick={openRatingModal} className="createListButton btn-danger">Delete List</button>
      </section>
      {isModalOpen && <DeleteList  onClose={closeRatingModal} />}

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
    </>
  );
}