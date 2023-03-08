import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {

    const location = useLocation();
    const { user } = useSelector(store => store.auth);

    if (onlyUnAuth && user) {
        return <Navigate to={location?.state?.from || '/'} />;
    }

    if (!user && !onlyUnAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};