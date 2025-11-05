import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateListModal from "../components/newList.jsx";


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
        <p className="listPageTitle">Your Lists</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="Lists">
          {Array.isArray(lists) && lists.length > 0 ? (
          <div className="Lists">
            {lists.map((list) => (
              <div className="list-results">
              <div key={list.id} className="show-item"  onClick={() => {handleClick(list); }}>
                <h3 className="List-title">{list.name}</h3>
                </div>
              </div>
            ))}
            
          </div>
        ) : (<p>Not Signed in</p>)}
        </div>
        <button onClick={openRatingModal} className="createListButton btn-primary">Create New List</button>

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