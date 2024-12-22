import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
      <div className="flex justify-center items-center max-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Welcome to Our Bookstore!
          </h1>

          <p className="text-lg text-center text-gray-600 mb-8">
            Find your favorite books and start reading today.
          </p>
          <Link
            to="/signin"
            className="block w-full py-2 px-4 bg-btn_color text-white text-center font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
};

export default WelcomePage;
