import { Link } from "react-router-dom";

export default function Lists(user) {
  

  // useEffect(() => {
  //   getMostPopularAnime(100);
  // }, []);

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
            {user ? (
              <div class="dropdown">
              <button class="dropbtn">Username 
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                <a href="#">My Profile</a>
                <Link to="/Reviews">Reviews</Link>
                <Link to="/MyLists">My Lists</Link>
                <a href="#">Followed Acounts</a>
                <a href="#">Signout</a>
              </div>
            </div>) : ( <div className="auth-buttons">
              <Link to ="/signin" className="btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </div>  )}
          </nav>
        </div>
      </header>
      <br></br>
      <br/>
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