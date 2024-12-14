import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);

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
    const toggleLike = (id) =>{
        setLikedBooks(prev =>
                    prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
                );
    }


        return (
            <div className="bg-primary min-h-screen p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Book List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className="bg-white shadow-md rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
                            <img
                                src={book.coverImageUrl || 'https://via.placeholder.com/150'}
                                alt={book.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-700">{book.title}</h2>
                                <p className="text-sm text-gray-500">{book.author}</p>
                                <p className="text-gray-800 font-semibold mt-2">${book.price}</p>
                                <button
                                    className="mt-4 flex items-center text-red-500 hover:text-primary"
                                    onClick={() => toggleLike(book.id)}>
                                    <FontAwesomeIcon
                                        icon={likedBooks.includes(book.id) ? filledHeart : unfilledHeart}
                                        className="mr-2"
                                    />

                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

};

export default BookList;
