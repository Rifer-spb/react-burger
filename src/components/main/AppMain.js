import React from "react";
import style from './AppMainCss.module.css';
import { Routes, Route } from "react-router";
import Home from "../../pages/home/Home";
import Auth from "../../pages/auth/Auth";

function AppMain() {
    return(
        <main className={style.main}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/auth" element={<Auth />}/>
            </Routes>
        </main>
    );
}

export default AppMain