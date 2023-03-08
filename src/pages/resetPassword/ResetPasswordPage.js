import React, { useState } from "react";
import style from './ResetPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPasswordRequest} from "../../utils/api/auth";
import {checkResponse} from "../../utils/helpers/helperRequest";

function ResetPasswordPage() {

    const navigate = useNavigate();

    const [ showPassword, setShowPassword ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorText, setPasswordErrorText ] = useState('');

    const [ code, setCode ] = useState('');
    const [ codeError, setCodeError ] = useState(false);
    const [ codeErrorText, setCodeErrorText ] = useState('');

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

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

    const handleSubmit = async () => {
        if(validate()) {
            resetPasswordRequest({
                password: password,
                token: code
            })
                .then(response => checkResponse(response))
                .then( response  => {
                    if (response && response.success) {
                        navigate('/login');
                    }
                }).catch( err => {
                    console.log(err);
                });
        }
    };

    return (
        <section className={style.resetPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
            <div className={style.formGroup}>
                <Input
                    type={showPassword?'text':'password'}
                    placeholder={'Введите новый пароль'}
                    value={password}
                    name={'name'}
                    error={passwordError}
                    errorText={passwordErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setPassword(e.target.value)}
                    icon={'ShowIcon'}
                    onIconClick={handleShowPasswordClick}
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