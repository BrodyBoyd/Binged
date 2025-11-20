import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DeleteList from "../components/deleteList.jsx";
import ListRatingModal from "../components/listRatingModal";
import Navbar from '../components/navbar.jsx'

export default function Lists() {

  const [lists, setLists] = useState([])
  const [shows, setShows] = useState([])
  const [listName, setListName] = useState('')
  const [receivedData, setRecievedData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true)
  }
    
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openRatingModal = (show) => {
    setCurrentShow(show);
    setIsRatingModalOpen(true);
  };
    
  const closeRatingModal = () => {
    setIsRatingModalOpen(false)
    setCurrentShow(null);
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
      if (isPending === false){
        setIsLoading(false);
      }
    }, [isPending, session, location.state])


  return (
    <>
      <Navbar signOut={signOut} session={session} />
      
      <section className="allListsPage flex flex-col items-center">
        <br/>
        <br/>
       {!isLoading ? 
       <>
       <p className="listPageTitle">{listName}</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="Lists">
          {receivedData ? (
          <div className="list-results">
            <div className="search-results">
              {shows.map((show) => (
                <div key={show.id} className="show-item" onClick={() => openRatingModal(show)}>
                  <img src={show.image || "/placeholder.svg"} alt={show.title} />
                  <div className="show-info">
                    <h3 className="show-title">{show.title}</h3>
                    <div className="show-rating">★ {show.rating}</div>
                    {show.episodes != null && ( <div className="show-episodes">{show.episodes} episodes</div> )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (<p>No Shows in List</p>)}

        </div>
        <button onClick={openModal} className="createListButton btn-danger">Delete List</button>
        </> : <p>Loading...</p>}
      </section>
      {isModalOpen && <DeleteList listName={listName} onClose={closeModal} />}
      {isRatingModalOpen && <ListRatingModal show={currentShow} onClose={closeRatingModal} />}

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
    </>
  );
}