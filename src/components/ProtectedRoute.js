import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {

    const location = useLocation();
    const { user, request } = useSelector(store => store.auth);

    if (request.load) {
        return null;
    }

    if (onlyUnAuth && user) {
        return <Navigate to={'/'} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool
};