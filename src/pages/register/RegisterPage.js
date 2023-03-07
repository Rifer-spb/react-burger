import React, {useRef} from "react";
import style from './RegisterPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function RegisterPage() {

    const name = useRef('');
    const email = useRef('');
    const password = useRef('');

    return (
        <section className={style.register}>
            <h1 className={style.h1 + " text_type_main-medium"}>Регистрация</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={name.current}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange=""
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={email.current}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange=""
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
                    icon={'ShowIcon'}
                />
            </div>
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
            </div>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                    <Link to="/login">Войти</Link>
                </li>
            </ul>
        </section>
    );
}

export default RegisterPage;