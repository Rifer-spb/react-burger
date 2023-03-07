import React from "react";
import style from './Menu.module.css';
import { Link  } from "react-router-dom";

function Menu() {
    return (
        <section className={style.menu}>
            <ul className={style.ul}>
                <li className={"text_type_main-medium " + style.active}>
                    <Link to="/profile">Профиль</Link>
                </li>
                <li className="text_type_main-medium">
                    <Link to="/profile/orders">История заказов</Link>
                </li>
                <li className="text_type_main-medium">
                    <Link to="/profile/logout">Выход</Link>
                </li>
            </ul>
        </section>
    );
}

export default Menu;