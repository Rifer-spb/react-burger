import React, {useRef} from "react";
import style from './LoginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function LoginPage() {

    const login = useRef('');
    const loginRef = useRef(null);
    const password = useRef('');
    const passwordRef = useRef(null);

    return(
        <section className={style.login}>
            <h1 className={style.h1 + " text_type_main-medium"}>Вход</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={login.current}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange=""
                    ref={loginRef}
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    value={password.current}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange=""
                    ref={passwordRef}
                    icon={'ShowIcon'}
                />
            </div>
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="primary" size="medium">Войти</Button>
            </div>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <Link to="/register">Зарегистрироваться</Link>
                </li>
                <li className="text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </li>
            </ul>
        </section>
    );
}

export default LoginPage