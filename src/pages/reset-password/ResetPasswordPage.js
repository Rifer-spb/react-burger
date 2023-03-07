import React, {useRef} from "react";
import style from './ResetPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ResetPasswordPage() {

    const password = useRef('');
    const code = useRef('');

    return (
        <section className={style.resetPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    value={password.current}
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
                    placeholder={'Введите код из письма'}
                    value={code.current}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange=""
                />
            </div>
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
            </div>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    <Link to="/login">Войти</Link>
                </li>
            </ul>
        </section>
    );
}

export default ResetPasswordPage;