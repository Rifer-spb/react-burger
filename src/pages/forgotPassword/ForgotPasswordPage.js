import React, { useState } from "react";
import style from './ForgotPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid } from "../../utils/helpers/helperField";
import { passwordResetRequest } from "../../utils/api/auth";
import { checkResponse } from "../../utils/helpers/helperRequest";

function ForgotPasswordPage() {

    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(false);
    const [ errorText, setErrorText ] = useState('');
    const [ requestError, setRequestError ] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        setError(false);
        setErrorText('');
        if(email === '') {
            setError(true);
            setErrorText('Необходимо указать e-mail');
            return false;
        }
        if(!isEmailValid(email)) {
            setError(true);
            setErrorText('Некорректный e-mail');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if(validate()) {
            setRequestError('');
            passwordResetRequest({ email: email })
                .then(response => checkResponse(response))
                .then( response  => {
                    if (response && response.success) {
                        navigate('/reset-password');
                    } else {
                        setRequestError('Что-то пошло не так. Попробуйте еще раз..');
                    }
                }).catch( err => {
                    console.log(err);
                    setRequestError('Что-то пошло не так. Попробуйте еще раз..');
                })
        }
    };

    return (
        <section className={style.forgotPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={email}
                    name={'email'}
                    error={error}
                    errorText={errorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            {
                requestError !== '' && <p className={style.requestError + " text_type_main-small"}>{requestError}</p>
            }
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Восстановить</Button>
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

export default ForgotPasswordPage;