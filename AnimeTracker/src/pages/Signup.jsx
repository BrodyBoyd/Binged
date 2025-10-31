import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState("")
  const [repeatPassword, setRepeatPassword] = useState('')
  
    const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
      console.log('working')
      e.preventDefault();
      if (repeatPassword === password){
      try {
        const res = await authClient.signUp.email({
        email: email, // required
        name: fullName, // required
        password: password, // required
        username: username, // required
      });
      if(res.error) {
          console.error("Login error:", res.error.message);
          setErrorMessage(res.error.message)
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`);
          navigate("/");
        }
    } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    }
    } else {
      setErrorMessage("Passwords must be the same!")
    }
  }
  
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
            <Link to="/MyLists" className="nav-link">Lists</Link>
            <Link to="/Reviews" className="nav-link">Reviews</Link>
          </div>
          <div className="auth-buttons">
            
          </div>
        </nav>
      </div>
    </header>

    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Sign Up!</h1>
          <p className="hero-subtitle">
            Join thousands of anime enthusiasts in rating and discovering your next binge-worthy series. Create lists,
            write reviews, and never forget what you've watched.
          </p>
          <div className="Signup-form">
            <form className="" onSubmit={handleSubmit}>
              <div class="form-group">
                  <input class="form-field" type="text" placeholder="Full Name (will stay hidden)" onChange={(e) => setFullName(e.target.value)}></input>
                  <span>Full Name</span>
              </div>
              <br/>
              <div class="form-group">
                  <span>Username</span>
                  <input class="form-field" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
              </div>
              <br/>
              <div class="form-group">
                  <input class="form-field" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                  <span>Email</span>
              </div>
              <br/>
              <div class="form-group">
                  <span>Password</span>
                  <input class="form-field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <br/>
              <div class="form-group">
                  <input class="form-field" type="password" placeholder="Repeat Password" onChange={(e) => setRepeatPassword(e.target.value)}></input>
                  <span>Repeat Password</span>
              </div>
              <br/>
              {errorMessage ? (
                <p style={{color: 'red'}}>{errorMessage}</p>        
          ) : (
              <p></p>
            )}
              <div className="signup-buttons">
                <button type="submit" className="btn-primary btn-large">Sign Up</button>
                <Link to="/signin" className="btn-secondary btn-large">Don't have an Account? Sign in!</Link>
              </div>
            </form>
        </div>
      </div>
      </div>
    </section>

    <footer>
        <p>Created by Brody Boyd</p>
        <a href="https://www.instagram.com/brody.boyd96?igsh=MTlpNzhvcG9yNGFidA%3D%3D&utm_source=qr" target="_blank" class="fa fa-instagram"></a>
        <a href="https://www.linkedin.com/in/brody-boyd-757778220" target="_blank" class="fa fa-linkedin"></a>
      </footer>
    </>
  );
}