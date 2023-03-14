import React, {useState} from "react";
import style from './Menu.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from "react-router-dom";

function Menu() {

    const { pathname } = useLocation();

    const isActive = (url) => {
        return pathname === url;
    };

    const getClass = (url) => {
        const classes = ["text_type_main-default"];
        if (isActive(url)) {
            classes.push("text_color_primary");
        } else {
            classes.push("text_color_inactive");
        }
        return classes.join(' ');
    };

    return (
        <nav className={style.menu}>
            <ul>
                <li>
                    <Link to="/" className={getClass('/')}>
                        <BurgerIcon type={isActive('/') ? "primary" : "secondary"}/>
                        Конструктор
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className={getClass('/orders')}>
                        <ListIcon type={isActive('/orders') ? "primary" : "secondary"}/>
                        Лента заказов
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu