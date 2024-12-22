import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);


  return (
    <nav className="bg-btn_color text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold p-2">
          Readify
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/books" className="hover:text-gray-300 text-xl">
              Books
            </Link>
          </li>
          <li>
            <Link to="/addBook" className="hover:text-gray-300 text-xl">
              Add Book
            </Link>
          </li>
        </ul>

        {/* Login/Logout Buttons */}
        <div className="flex space-x-4">
          {!isAuthenticated && (
            <>
              <Link
                to="/signin"
                className="bg-dark_brown px-4 py-2 rounded hover:bg-gray-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-dark_brown px-4 py-2 rounded hover:bg-gray-400"
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-dark_brown px-4 py-2 rounded hover:bg-gray-600"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
