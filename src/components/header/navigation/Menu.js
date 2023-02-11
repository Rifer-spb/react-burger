import React from "react";
import style from './Menu.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Menu() {
    return (
        <nav className={style.menu}>
            <ul>
                <li>
                    <a className="text_type_main-default text_color_primary" href="#">
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </a>
                </li>
                <li>
                    <a className="text_type_main-default text_color_inactive" href="#">
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Menu