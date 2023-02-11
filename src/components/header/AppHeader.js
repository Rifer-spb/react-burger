import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeader.module.css';
import Menu from './navigation/Menu';
import Auth from './auth/Auth';

function AppHeader() {
    return (
        <header className={style.header}>
            <div className={style.inner}>
                <section className={style.left}>
                    <Menu />
                </section>
                <section className={style.center}>
                    <Logo />
                </section>
                <section className={style.right}>
                    <Auth />
                </section>
            </div>
        </header>
    );
}

export default AppHeader