import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';
import BookEdit from './BookEdit';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    console.log(token)


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
    const toggleLike = async (bookId) => {
            const updatedLikedBooks = likedBooks.includes(bookId)
                ? likedBooks.filter(id => id !== bookId)
                : [...likedBooks, bookId];

            if (!token) {
              alert('Please log in to like a book.');
              return;
            }
            setLikedBooks(updatedLikedBooks);



            try {
                const response = await axios.post(
                    `http://localhost:8080/api/books/${bookId}/like`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                if (response.status === 200) {
                    console.log("Book liked successfully");
                }
                if (response.status === 403) {
                       alert('You must be logged in to like a book');
                }
            } catch (error) {
                console.error('Error liking book:', error);
            }
        };

        const deleteBook = async (bookId) => {
                try {
                    const response = await axios.delete(`http://localhost:8080/api/books/${bookId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.status === 200) {

                        setBooks(books.filter(book => book.id !== bookId));
                        console.log("Book deleted successfully");
                    }
                } catch (error) {
                    console.error('Error deleting book:', error);
                    console.log(token)
                }
            };

        const handleEdit = (id) => {
                navigate(`/books/edit/${id}`);
            };


        return (
            <div className="bg-primary min-h-screen p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Book List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className="bg-white shadow-md rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
                            <img
                                src={book.coverImageUrl || 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'}
                                alt={book.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="bg-light p-4">
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
                                <button
                                    className="mt-4 ml-4 text-red-600 hover:text-red-800 mr-4"
                                    onClick={() => deleteBook(book.id)}>
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(book.id)}
                                    className="bg-primary text-white px-4 py-1 rounded-md hover:bg-primary-dark"
                                >
                                    Update Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

};

export default BookList;
