import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
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
                })
                .catch(error => {
                    console.error('Error registering user:', error.response || error.message);
                    alert(`Failed to create user: ${error.response.data}`);

                });
        };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;
