import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddBook from './pages/AddBook'; // Feltételezve, hogy van AddBook komponensed
import BookList from './pages/BookList'; // A könyvek listája komponens



class App extends Component {
  state = {
    books: []
  };

  // Adatok betöltése a szerverről
   async componentDidMount() {
      try {
        const response = await fetch('http://localhost:8080/books'); // API hívás
        if (!response.ok) {
          console.error('HTTP Error:', response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }


        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
        const body = await response.json();
        console.log('Fetched books:', body);
        this.setState({ books: body });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

  render() {
      const { books } = this.state; 
      return (
      <Router>
        <div className="App">
         {/* Navigation Bar */}
                            <nav className="bg-btn_color text-white py-4">
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
                                <div className="flex space-x-4">
                                  <Link
                                    to="/login"
                                    className="bg-dark_brown px-4 py-2 rounded hover:bg-gray-600"
                                  >
                                    Login
                                  </Link>
                                  <Link
                                    to="/signup"
                                    className="bg-dark_brown px-4 py-2 rounded hover:bg-gray-400"
                                  >
                                    Sign Up
                                  </Link>
                                </div>
                              </div>
                            </nav>

                            {/* Main Content */}
                            <header className="App-header">
                              <Routes>
                                <Route path="/books" element={<BookList />} />
                                <Route path="/addBook" element={<AddBook />} />
                              </Routes>
                            </header>
        </div>
        </Router>
      );
    }
}

export default App;
