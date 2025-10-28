import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useEffect, useState } from "react";

export default function Lists() {

  const [lists, setLists] = useState([])

  const signOut = async () => {
    await authClient.signOut();
  }

  

  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    useEffect(() => {
      if (session){
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
                <Link href="/MyProfile">My Profile</Link>
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
        </div>
      </section>

    </>
  );
}