import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AppHeader from "../header/AppHeader";
import style from "./App.module.css";
import {useDispatch} from "react-redux";
import {loadIngredients} from "../../services/actions/ingredient";
import { checkUserAuth } from "../../services/actions/auth";
import { ColumnLayout } from '../../layouts';
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    ProfileOrdersPage,
    NotFoundPage,
    IngredientsPage
} from'../../pages';
import { default as ProfileSideBar } from "../../pages/profile/sideBar/SideBar";
import { ProtectedRoute } from "../ProtectedRoute";
import IngredientDetails from "../main/burgerIngredients/category/IngredientItem/IngredientDetails/IngredientDetails";
import Modal from "../common/modal/Modal";

function App() {

    const ModalSwitch = () => {

        const dispatch = useDispatch();
        const location = useLocation();
        const navigate = useNavigate();
        const background = location.state && location.state.background;

        useEffect(() => {
            dispatch(loadIngredients());
            dispatch(checkUserAuth());
        },[dispatch]);

        const handleModalClose = () => {
            navigate(-1);
        };

        return (
            <>
                <AppHeader/>
                <main className={style.main}>
                    <Routes location={background || location}>
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
                        <Route path="/ingredients/:id" element={<IngredientsPage/>}/>
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                    {background && (
                        <Routes>
                            <Route
                                path='/ingredients/:id'
                                element={
                                    <Modal onClose={handleModalClose} title="Детали ингредиента">
                                        <IngredientDetails />
                                    </Modal>
                                }
                            />
                        </Routes>
                    )}
                </main>
            </>
        );
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;