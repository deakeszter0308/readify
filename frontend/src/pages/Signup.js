import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
            e.preventDefault();

            console.log('Creating user:', formData);

            axios.post('http://localhost:8010/proxy/api/auth/signup', formData, {
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
                    alert('User registered successfully!');
                    // Resetelés csak sikeres válasz után
                    setFormData({ username: '', email: '', password: '' });
                    navigate("/signin")
                    alert("Sign in please")
                })
                .catch(error => {
                    console.error('Error registering user:', error.response || error.message);
                    alert(`Failed to create user: ${error.response.data}`);

                });
        };

  return (
      <div className="max-h-screen bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="bg-btn_color text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
};

export default Signup;
