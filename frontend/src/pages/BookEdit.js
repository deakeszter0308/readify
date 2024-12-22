import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookEdit = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: 0,
        category: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8010/proxy/api/books/${id}`, book, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                console.log('Book updated successfully');
                navigate(`/books`); // Visszairányítjuk a könyv részleteihez
            }
            if (response.status === 403) {
                     alert('You must be logged in to update a book');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="bg-primary min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Book</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default BookEdit;
