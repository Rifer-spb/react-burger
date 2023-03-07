import React from "react";
import style from './Menu.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

function Menu() {
    return (
        <nav className={style.menu}>
            <ul>
                <li>
                    <Link to="/" className="text_type_main-default text_color_primary">
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text_type_main-default text_color_inactive">
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu