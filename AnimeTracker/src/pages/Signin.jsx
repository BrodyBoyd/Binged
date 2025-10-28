import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js";
import { useNavigate } from "react-router-dom";




export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('working')
    e.preventDefault();
    
    try {
        const res = await authClient.signIn.email({email: email, password: password});
        // console.log("Login successful:", res);
        if(res.error) {
          console.error("Login error:", res.error.message);
          setErrorMessage(res.error.message)
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`)         
          navigate("/");
        }
        }
          catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
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
          <h1 className="hero-title">Sign In!</h1>
          <div className="Signup-form" >
            <form className="" onSubmit={handleSubmit}>
              <div className="form-group">
                  <input className="form-field" type="email" value={email} placeholder="Email" 
                  required onChange={(e) => setEmail(e.target.value)}></input>
                  <span>Email</span>
              </div>
              <br/>
              <div className="form-group">
                  <span>Password</span>
                  <input className="form-field" type="password" value={password} placeholder="Password"  
                  required onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
              {/* <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label small" htmlFor="remember" style={{ color: "#666666" }}>
                  Remember me
                </label>
              </div>
              <a href="#" className="small text-decoration-none" style={{ color: "#000000" }}>
                Forgot password?
              </a> */}
              {errorMessage ? (
                <p style={{color: 'red'}}>{errorMessage}</p>        
          ) : (
              <p></p>
            )}
            </div>
              <br/>
              <br/>
              <div className="signup-buttons">
                <button type="submit" className="btn-primary btn-large" >Sign in</button>
                <Link to="/signup" className="btn-secondary btn-large">Don't have an Account? Sign Up!</Link>
              </div>
            </form>
        </div>
      </div>
      </div>
    </section>
    </>
  );
}