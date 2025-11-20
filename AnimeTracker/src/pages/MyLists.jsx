import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateListModal from "../components/newList.jsx";
import Navbar from '../components/navbar.jsx'


export default function Lists() {

  const [lists, setLists] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // const [currentList, setCurrentList] = useState(null)
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut();
    navigate("/")
  }
  
  const openRatingModal = () => {
    setIsModalOpen(true)
  }
    
  const closeRatingModal = () => {
    setIsModalOpen(false)
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
      }
    }, [])


  return (
    <>
      <Navbar />
      
      <section className="allListsPage">
        <br/>
        <br/>
        <p className="listPageTitle">Your Lists</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="Lists">
          {Array.isArray(lists) && lists.length > 0 ? (
            <div className="flex flex-col items-center w-full">
          <div className="Lists">
            {lists.map((list) => (
              <div key={list.id} className="list-results" onClick={() => {handleClick(list); }}>
                <h3 className="List-title">{list.name}</h3>
              </div>
            ))}
          </div>
          <button onClick={openRatingModal} className="createListButton btn-primary">Create New List</button>
          </div>
          
        ) : (<p>Not Signed in</p>)}
        </div>

        {isModalOpen && <CreateListModal  onClose={closeRatingModal} />}
      </section>

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
    </>
  );
}