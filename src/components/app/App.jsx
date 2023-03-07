import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../header/AppHeader";
import style from "./App.module.css";
import { useDispatch } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    ProfileOrdersPage
} from'../../pages';
import ProfileForm from "../../pages/profile/rightCol/profileForm/ProfileForm";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    },[dispatch]);

    return (
        <Router>
            <AppHeader/>
            <main className={style.main}>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                    <Route path="/reset-password" element={<ResetPasswordPage />}/>
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route index element={<ProfileForm/>} />
                        <Route path="orders" element={<ProfileOrdersPage/>} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default App;