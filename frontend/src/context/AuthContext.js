import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [role, setRole] = useState(null);
     console.log(role)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            setIsAuthenticated(true);
            setRole(decoded.role);
            console.log("---------------------")
            console.log(decoded)

        }

    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setRole(decoded.role);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
