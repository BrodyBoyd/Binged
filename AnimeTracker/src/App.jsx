import { useState, useEffect } from 'react'
import './App.css'
import RatingModal from "./components/ratingModal"
import { Link, Routes, Route } from "react-router-dom"
import Discover from "./pages/Discover"
import Signup from "./pages/Signup"
import ShowPage from "./pages/ShowPage"
import Signin from "./pages/Signin"
import Lists from "./pages/MyLists"
import Reviews from './pages/Reviews.jsx'
import MyProfile from './pages/UserPage.jsx'
import List from './pages/List.jsx'
import { authClient } from "./auth-client.js"
import { useNavigate } from "react-router-dom";




function Home({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  openRatingModal,
  isModalOpen,
  currentShow,
  closeRatingModal,
  setShowType,
  session,
  signout
  
}) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <h1>Binged</h1>
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link activeLink" style={{color: 'White'}}>Home</Link>
              <Link to="/discover" className="nav-link">Discover</Link>
              <Link to="/MyLists" className="nav-link">Lists</Link>
              <Link to="/Reviews" className="nav-link">Reviews</Link>
              <Link to="/MyProfile">My Profile</Link>
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
                <a href="#" onClick={signout} >Signout</a>  
              </div>
            </div>)}
            
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Track, Rate & Discover Amazing Anime and Tv Shows</h1>
            {!session ? (<p>Not Logged In</p>) : (<p>User {session.user.username} Logged In</p>)}
            <p className="hero-subtitle">
              Join thousands of anime and tv enthusiasts in rating and discovering your next binge-worthy series. Create lists,
              write reviews, and never forget what you've watched.
            </p>
            {!session ? (<div className="hero-buttons">
              <Link to ="/signin"  className="btn-primary btn-large">Get Started Free</Link>
              <Link to="/discover" className="btn-secondary btn-large">Discover</Link>
            </div>) : (
              <div className="hero-buttons">
              <Link to="/discover" className="btn-secondary btn-large">Discover</Link>
            </div>
            )}
            
          </div>
          <div className="hero-image">
            <div className="show-grid">
              <div className="show-card">
                <img src="./one_Piece.jpg" alt="One Piece" />
                <div className="rating">9.5</div>
              </div>
              <div className="show-card featured">
                <img src="./Bleach.jpg" alt="Bleach" />
                <div className="rating">8.7</div>
              </div>
              <div className="show-card">
                <img src="./naruto.jpg" alt="Naruto" />
                <div className="rating">9.2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="add-show">
        <div className="container">
          <h2 className="section-title">Add New Show</h2>
          <div className="search-container">
          <div class="tabs">
            <div class="tab-group">
              <input id="anime" name="tab" value="anime" type="radio" onChange={() => { setShowType('anime'); }}/>
              <label for="anime">
                <span>Anime</span>
              </label>
            </div>
            <br/>
            <div class="tab-group">
              <input id="liveAction" name="tab" value="liveAction" type="radio" onChange={() => { setShowType('liveAction'); }} />
              <label for="liveAction">
                <span>Live Action</span>
              </label>
            </div>
          </div>
          <br/>
            <input
              type="text"
              placeholder="Search for TV shows..."
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((show) => (
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
          )}
        </div>
      </section>

      {isModalOpen && <RatingModal show={currentShow} onClose={closeRatingModal} />}

      <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
    </>
  )
}

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentShow, setCurrentShow] = useState(null)
  const [showType, setShowType] = useState(''); // 'anime' or 'liveAction'
  const [user, setUser] = useState('1');
  const navigate = useNavigate();

  const openRatingModal = (show) => {
    setCurrentShow(show)
    setIsModalOpen(true)
  }
  
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
  
    
  const closeRatingModal = () => {
    setIsModalOpen(false)
    setCurrentShow(null)
  }

  
  const signout = async () => {
    await authClient.signOut();
    navigate("/")
  }

  const handleSearch = async () => {
    setSearchResults([])
    console.log(session?.user?.username, isPending, error, refetch)
    console.log(user)
    console.log("Searching for:", searchQuery, "Type:", showType);
    if (showType === 'anime') {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&limit=15`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = Array.isArray(data?.data)
        ? data.data.map(anime => ({
            id: anime.mal_id,
            title: anime.title_english ?? anime.title,
            rating: anime.score ?? 'N/A',
            episodes: anime.episodes ?? 'N/A',
            image: anime.images?.jpg?.image_url ?? '/placeholder.svg',
            url: anime.url,
            status: anime.status ?? 'N/A',
            type: anime.type ?? 'N/A',
            genres: anime.genres?.map(g => g.name).join(', ') || 'N/A',
            description: anime.synopsis || 'No description available.'
          }))
        : [];
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error("Error fetching anime:", error);
      setSearchResults([]);
      return [];
    }
  } else if (showType === 'liveAction') {
    const proxy = "https://corsproxy.io/?";
    const url = `${proxy}https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}&limit=15`;
    try {
    const response = await fetch(url);
    const data = await response.json();
    const results = Array.isArray(data)
      ? data.map(item => ({
          title: item.show.name,
          rating: item.show.rating?.average,
          genres: item.show.genres.join(', ') || 'N/A',
          image: item.show.image?.medium,
          url: item.show.url,
          description: item.show.summary,
          status: item.show.status,
          type: item.show.type,
          id: item.show.id,

        }))
      : [];

    setSearchResults(results);
    return results;
      }catch (error) {
      console.error("Error fetching anime:", error);
      setSearchResults([]);
      return [];
    }
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <Home
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleSearch={handleSearch}
          signout={signout}
          openRatingModal={openRatingModal}
          isModalOpen={isModalOpen}
          currentShow={currentShow}
          closeRatingModal={closeRatingModal}
          showType={showType}
         setShowType={setShowType}
         user={user}
         session={session}
         
        />
      } />
      <Route path="/show" element={<ShowPage />} />
      <Route path="/MyLists" element={<Lists/>} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path='/List' element={<List />} />
    </Routes>
  )
}

export default App
