import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../header/AppHeader";
import style from "./App.module.css";
import { useDispatch } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";
import { Breadcrumbs } from "../common/breadcrumbs";
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

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    },[dispatch]);

    return (
        <Router>
            <AppHeader/>
            <main className={style.main}>
                <Breadcrumbs/>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                    <Route path="/reset-password" element={<ResetPasswordPage />}/>
                    <Route path="/profile" element={
                        <ColumnLayout sideBar={<ProfileSideBar/>} />
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