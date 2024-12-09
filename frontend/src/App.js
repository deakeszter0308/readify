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
        const body = await response.json(); // JSON adat
        console.log('Fetched books:', body);
        this.setState({ books: body });  // Állapot frissítése
      } catch (error) {
        console.error('Error fetching books:', error); // Hiba kezelése
      }
    }

  render() {
      const { books } = this.state; // Az állapotból a könyvek
      return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Readify</h1>
            {/* Navigációs gomb */}
            <nav>
              <Link to="/books">Books</Link> |
              <Link to="/addBook">Add Book</Link>

            </nav>
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
