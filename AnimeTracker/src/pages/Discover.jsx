import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingModal from "../components/ratingModal";

export default function Discover() {
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [userRatedShows, setUserRatedShows] = useState([]);
  const [showType, setShowType] = useState('');
  const [page, setPage] = useState(0);

  const openRatingModal = (show) => {
    setCurrentShow(show);
    setIsModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsModalOpen(false);
    setCurrentShow(null);
  };
  const handleRatingSubmit = (ratedShow) => {
    const updatedShows = userRatedShows.filter((show) => show.id !== ratedShow.id);
    const newRatedShows = [...updatedShows, ratedShow];

    setUserRatedShows(newRatedShows);
    closeRatingModal();
  };
  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  const backPage = () => {
    if (page > 0) {
      setPage(page - 1)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }else {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }}
  useEffect(() => {
    if (showType === "anime") {
      getMostPopularAnime(25, page);
    }
  }, [showType, page]);


  

  async function getMostPopularAnime(limit = 25, startPage=0) {
    const perPage = 25;
    const totalPages = Math.ceil(limit / perPage);
    const pageUrls = [];
    for (let i = 1; i <= totalPages; i++) {
      const pageNum = startPage + i;
      pageUrls.push(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${pageNum}`);
    }
    try {
      const responses = await Promise.all(pageUrls.map(url => fetch(url).then(r => r.json())));
      const all = responses
        .flatMap(data =>
          Array.isArray(data?.data)
            ? data.data.map(anime => ({
                id: anime.mal_id,
                title_english: anime.title_english || anime.title,
                title: anime.title,
                rating: anime.score ?? "N/A",
                episodes: anime.episodes,
                image: anime.images?.jpg?.image_url ?? "/placeholder.svg",
                url: anime.url,
              }))
            : []
        )
        .slice(0, limit);

      setSearchResults(all);
    } catch (err) {
      console.error("Error fetching top anime:", err);
      setSearchResults([]);
    }
  }

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
              <Link to="/discover" className="nav-link activeLink">Discover</Link>
              <Link to="/MyLists" className="nav-link">Lists</Link>
              <a href="#" className="nav-link">Reviews</a>
            </div>
            <div className="auth-buttons">
              <Link to ="/signin" className="btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </div>
          </nav>
        </div>
      </header>
      <br></br>
      <br/>
      <section className="discoverPage">
        <div className="container">
          <h2 className="section-title">Top Popular Anime and Tv Shows</h2>
          <div class="tabs">
            <div class="tab-group">
              <input id="anime" name="tab" value="anime" type="radio" onChange={() => { setShowType('anime'); setPage(0); }} />
              <label for="anime">
                <span>Anime</span>
              </label>
            </div>
            <br/>
            <div class="tab-group">
            <input id="liveAction" name="tab" value="liveAction" type="radio" onChange={() => { setShowType('liveAction'); setPage(0); }} />
              <label for="liveAction">
                <span>Live Action</span>
              </label>
            </div>
            
          </div>
          
          <br/>
          <p>Current Page {page+1}</p>

          {searchResults.length > 0 && showType== 'anime' ? (
            <div className="search-results">
              {searchResults.map((show) => (
                <div key={show.id} className="show-item" onClick={() => openRatingModal(show)}>
                  <img src={show.image || "/placeholder.svg"} alt={show.title} />
                  <div className="show-info">
                    <h3 className="show-title">{show.title_english}</h3>
                    <div className="show-rating">★ {show.rating}</div>
                    <div className="show-episodes">{show.episodes} episodes</div>
                  </div>
                </div>
              ))}
              <div className="pageChangers">
          <a class="pageButton" onClick={() => {backPage(); }}>&#8249;&#8249;</a>
          <a class="pageButton" onClick={() => {nextPage(); }}>&#8250;&#8250;</a>
        </div>
            </div>
            
          ) : (
            showType === 'liveAction' ? (
              <p>Coming Soon!</p>
            ) : (
              <p>Select a Type of Show</p>
            )
          )}
        </div>
        
      </section>

      {isModalOpen && <RatingModal show={currentShow} onClose={closeRatingModal} onSubmit={handleRatingSubmit} />}
    </>
  );
}