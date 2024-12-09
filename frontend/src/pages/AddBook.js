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
        <div>
            <h1>Add a New Book</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={book.title} onChange={handleChange} required /><br />

                <label>Author:</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} required /><br />

                <label>Category:</label>
                <input type="text" name="category" value={book.category} onChange={handleChange} required /><br />

                <label>Price:</label>
                <input type="number" name="price" value={book.price} onChange={handleChange} required /><br />

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
