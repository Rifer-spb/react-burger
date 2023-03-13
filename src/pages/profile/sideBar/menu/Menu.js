import React from "react";
import style from './Menu.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../services/actions/auth";

function Menu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout()).finally(() => {
            navigate('/');
        });
    };

    return (
        <section className={style.menu}>
            <ul className={style.ul}>
                <li className={"text_type_main-medium " + style.active}>
                    <Link to="/profile" state={{ from: location }}>Профиль</Link>
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