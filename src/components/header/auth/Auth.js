import React from "react";
import { Link } from "react-router-dom";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './Auth.module.css';

function Auth() {
    return (
        <div className={style.authBtn}>
            <Link to="/profile" className="text_type_main-default text_color_inactive">
                <ProfileIcon type="secondary" />
                Личный кабинет
            </Link>
        </div>
    );
}

export default Auth