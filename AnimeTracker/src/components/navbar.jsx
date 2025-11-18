"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authClient } from "../auth-client.js"
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
    const signout = async () => {
    await authClient.signOut();
    navigate("/")
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md navBarStyle">
      <div className="max-w-screen p-4 mx-auto px-4 py-3 ">
        <div className=" flex items-center justify-between ">
          {/* Left: Logo */}
          <Link to="/" className="text-xl font-bold text-purple-900 dark:text-purple-300">
            Binged
          </Link>

          {/* Center: Nav Links (hidden on mobile) */}
          <nav className="hidden md:flex flex-1 justify-between max-w-5/12 space-x-8 text-base md:text-lg ">
            
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 transition nav-link">Home</Link>
            <Link to="/discover" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 transition nav-link">Discover</Link>
            <Link to="/MyLists" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 transition nav-link">Lists</Link>
            <Link to="/Reviews" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 transition nav-link">Reviews</Link>
          </nav>

          {/* Right: Auth Buttons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 md:auth-buttons">
            {!session ? (    
              <>
                <Link to ="/signin" className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 text-base font-medium text-white bg-purple-600 rounded hover:bg-purple-700 transition">Sign up</Link>
              </> 
            ) : (
              <div class="dropdown">
              <button class="dropbtn">{session.user.username} 
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                <Link to="/MyProfile">My Profile</Link>
                <a href="#" onClick={signout} >Signout</a>  
              </div>
            </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 space-y-2 text-base">
            <Link to="/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Home</Link>
            <Link to="/discover" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Discover</Link>
            <Link to="/MyLists" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Lists</Link>
            <Link to="/Reviews" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Reviews</Link>
            {!session ? (
            <div className="mt-4 flex flex-col gap-2">      
                <Link to ="/signin" className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:text-purple-600">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 text-left text-white bg-purple-600 rounded hover:bg-purple-700">Sign up</Link>
            </div>
            ): (
            <div className="mt-4 flex flex-col gap-2"> 
              <Link to="/MyProfile" className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:text-purple-600">My Profile</Link>
              <a href="#" onClick={signout} className="px-4 py-2 text-left text-white bg-purple-600 rounded hover:bg-purple-700">Signout</a>
            </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;