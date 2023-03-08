import React, { useState } from "react";
import style from './ResetPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ResetPasswordPage() {

    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorText, setPasswordErrorText ] = useState('');

    const [ code, setCode ] = useState('');
    const [ codeError, setCodeError ] = useState(false);
    const [ codeErrorText, setCodeErrorText ] = useState('');

    const validate = () => {

        let error = false;

        setPasswordError(false);
        setPasswordErrorText('');

        if(password === '') {
            setPasswordError(true);
            setPasswordErrorText('Необходимо указать пароль');
            error = true;
        }

        setCodeError(false);
        setCodeErrorText('');

        if(code === '') {
            setCodeError(true);
            setCodeErrorText('Необходимо указать код из письма');
            error = true;
        }

        if(!error) {
            return true;
        }
        return false;
    };

    const handleSubmit = () => {
        if(validate()) {
            console.log(true);
        }
    };

    return (
        <section className={style.resetPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    value={password}
                    name={'name'}
                    error={passwordError}
                    errorText={passwordErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={code}
                    name={'name'}
                    error={codeError}
                    errorText={codeErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Сохранить</Button>
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