import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, role } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    if (role === 'Admin') {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default PrivateRoute;
