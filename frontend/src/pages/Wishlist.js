import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';  // authContext.js elérési útvonala
import axios from 'axios';

function Wishlist() {
    const { isAuthenticated, login, logout } = useContext(AuthContext);
    const [likedBooks, setLikedBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        if(isAuthenticated){
            fetchLikedBooks();
        }

    }, [isAuthenticated]);


    const fetchLikedBooks = async () => {
        setLoading(true);
        setError(null);


        try {
              const token = localStorage.getItem('jwtToken')
              const response = await axios.get('http://localhost:8080/api/books/liked', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("Response data from liked books endpoint:", response.data)
            setLikedBooks(response.data.likedBooks);

        } catch (error) {
            console.error('Error fetching liked books:', error);
            setError('Error fetching liked books. Please try again later.');
            if (axios.isAxiosError(error)) {
                console.error('Full Axios Error:', error.response);
            }
        } finally {
            setLoading(false);
        }
    };

      const handleLogout = () => {
        logout();
      };

    if (loading) {
        return <p>Loading wishlist...</p>;

    }

    if (error) {
        return <p>Error: {error}</p>;
    }

     if (!isAuthenticated) {
         return(
             <>
                <p>Please login to see your wishlist!</p>
             </>
         )
      }

    if (likedBooks.length === 0) {
        return (
            <>
               <button onClick={handleLogout}>Logout</button>
               <p>Your wishlist is empty.</p>
           </>
        );
    }

    return (
         <>
            <button onClick={handleLogout}>Logout</button>
            <h2>Your Wishlist</h2>
            <ul>
                {likedBooks.map(book => (
                    <li key={book.id}>
                       {/* book.title helyett pl book.id vagy amilyen kulcsod van */}
                        {book.title ? book.title : 'No title'}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Wishlist;