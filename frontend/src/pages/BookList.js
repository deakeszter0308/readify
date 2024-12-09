import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // REST API hívás a backendhez
        axios.get('http://localhost:8080/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author} (${book.price})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
