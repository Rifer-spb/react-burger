import React from "react";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './Auth.module.css';

class Auth extends React.Component {
    render() {
        return (
            <div className={style.authBtn}>
                <a className="text_type_main-default text_color_inactive" href="#">
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </a>
            </div>
        );
    }
}

export default Auth