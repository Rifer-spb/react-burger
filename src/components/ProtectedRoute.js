import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {

    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (onlyUnAuth && isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!onlyUnAuth && !isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
};

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool
};