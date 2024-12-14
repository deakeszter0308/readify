import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Submitting book:', book);

        axios.post('http://localhost:8010/proxy/books', book, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                    username: 'test1',
                    password: 'test1',
                },
        })
            .then(response => {
                console.log('Response:', response.data);
                alert('Book added successfully!');
                // Resetelés csak sikeres válasz után
                setBook({ title: '', author: '', category: '', price: '' });
            })
            .catch(error => {
                console.error('Error adding book:', error.response || error.message);
                alert(`Failed to add book: ${error.message}`);
            });
    };


    return (
            <form onSubmit={handleSubmit} className="p-4 bg-primary rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        step="5"
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">
                    Add Book
                </button>
            </form>
        );
};

export default AddBook;
