import React from "react";
import {Link, useLocation} from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './Auth.module.css';

function Auth() {

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
        <div className={style.authBtn}>
            <Link to="/profile" className={getClass('/profile')}>
                <ProfileIcon type={isActive('/profile') ? "primary" : "secondary"} />
                Личный кабинет
            </Link>
        </div>
    );
}

export default Auth