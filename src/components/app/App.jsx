import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../header/AppHeader";
import style from "./App.module.css";
import { useDispatch } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";
import { getUser } from "../../services/actions/auth";
import { ColumnLayout } from '../../layouts';
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    ProfileOrdersPage,
    NotFoundPage
} from'../../pages';
import { default as ProfileSideBar } from "../../pages/profile/sideBar/SideBar";
import { ProtectedRoute } from "../ProtectedRoute";
import { getCookie } from "../../utils/cookies";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (getCookie('token')) {
            dispatch(getUser());
        }
        dispatch(loadIngredients());
    },[dispatch]);

    return (
        <Router>
            <AppHeader/>
            <main className={style.main}>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={
                        <ProtectedRoute onlyUnAuth={true}>
                            <LoginPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/register" element={
                        <ProtectedRoute onlyUnAuth={true}>
                            <RegisterPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/forgot-password" element={
                        <ProtectedRoute onlyUnAuth={true}>
                            <ForgotPasswordPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/reset-password" element={
                        <ProtectedRoute onlyUnAuth={true}>
                            <ResetPasswordPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ColumnLayout sideBar={<ProfileSideBar/>} />
                        </ProtectedRoute>
                    }>
                        <Route index element={<ProfilePage/>} />
                        <Route path="orders" element={<ProfileOrdersPage/>} />
                    </Route>
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;