import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import {AuthContext, AuthProvider} from '../context/AuthContext';
import '../App.css';
import Wishlist from "./Wishlist";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const isAuthenticated = true;
  console.log(isAuthenticated)


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, []);

  if (!isAuthenticated) {
      return null;  // Ha nem vagy bejelentkezve, nem jelenik meg a Dashboard tartalom
    }

  return (
    <AuthProvider>
        <div className="min-h-screen flex flex-col">


          {/* Dashboard content */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
            <p className="mb-8">You are successfully logged in.</p>

          </div>
        </div>

    </AuthProvider>
  );
};

export default Dashboard;
