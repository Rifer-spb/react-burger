import React from "react";
import style from './Menu.module.css';
import { Link  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../services/actions/auth";

function Menu() {

    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout());
    };

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
                    <a href="/" onClick={handleLogout}>Выход</a>
                </li>
            </ul>
        </section>
    );
}

export default Menu;