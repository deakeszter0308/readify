import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './pages/AddBook';
import WelcomePage from './pages/WelcomePage';
import BookList from './pages/BookList';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BookEdit from './pages/BookEdit';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './component/Navbar';
import PrivateRoute from './component/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Wishlist from './pages/Wishlist';

const App = () => {


  return (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar  />

        {/* Main Content */}
        <header className="App-header">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/books/edit/:id" element={<BookEdit />} />
            <Route
              path="/dashboard"
              element={
                  <Dashboard />
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
